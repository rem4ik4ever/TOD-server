import { arg, inputObjectType, mutationField, nonNull } from 'nexus';
import { getUserId } from '../utils';
import stripeApi, { extractMetadataFromCheckoutSession, StripeMetadata } from '../../../lib/stripe'
import Stripe from 'stripe';
import { SubscriptionType } from '@prisma/client';
import { compare, hash } from 'bcryptjs';

export const CreateSubscriptionInput = inputObjectType({
  name: 'CreateSubscriptionInput',
  definition (t) {
    t.nonNull.string('checkoutSessionId')
  }
})

export const ProfileUpdateInput = inputObjectType({
  name: 'ProfileUpdateInput',
  definition (t) {
    t.nullable.string('username')
    t.nullable.string('email')
  }
})

export const PasswordUpdateInput = inputObjectType({
  name: 'PasswordUpdateInput',
  definition (t) {
    t.nonNull.string('password')
    t.nonNull.string('newPassword')
  }
})

interface SubscriptionPayload {
  type: SubscriptionType
  price: number
}
const generatePayloadFromPlan = (plan: Stripe.Plan): SubscriptionPayload => {
  return {
    type: plan.interval === 'month' ? SubscriptionType.MONTHLY : SubscriptionType.ANNUAL,
    price: plan.amount as number
  }
}

const generatePayloadFromMetadata = (metadata: StripeMetadata): SubscriptionPayload => {
  return {
    type: SubscriptionType.MONTHLY,
    price: metadata.price as number
  }
}

export const UpdateProfile = mutationField(t => {
  t.nonNull.field('updateProfile', {
    type: 'User',
    args: {
      input: nonNull(arg({ type: 'ProfileUpdateInput' }))
    },
    async resolve (_, { input }, ctx) {
      const userId = getUserId(ctx);
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } })
      if (user === null) throw new Error('user not found')

      if (typeof input.email === 'string' && input.email.length > 0) {
        const existingEmail = await ctx.prisma.user.findUnique({ where: { email: input.email } })
        if (existingEmail != null) throw new Error('email_is_taken')

        user.email = input.email
        user.confirmed = false
      }
      if (typeof input.username === 'string' && input.username.length > 0) {
        user.username = input.username
      }

      const updatedUser = await ctx.prisma.user.update({ where: { id: userId }, data: { ...user } })
      return updatedUser;
    }
  })
})

export const DeactivateProfile = mutationField(t => {
  t.nonNull.field('deactivateProfile', {
    type: 'Boolean',
    async resolve (_, __, ctx) {
      const userId = getUserId(ctx);
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } })
      if (user === null) throw new Error('user not found')
      // @TODO do complete wipe of the account and related data
      user.email = `deleted-${Date.now()}-${user.email}`
      await ctx.prisma.user.update({ where: { id: userId }, data: { ...user } })
      ctx.req.session.destroy()
      return true;
    }
  })
})

export const UpdatePassword = mutationField(t => {
  t.nonNull.field('updatePassword', {
    type: 'User',
    args: {
      input: nonNull(arg({ type: 'PasswordUpdateInput' }))
    },
    async resolve (_, { input }, ctx) {
      const userId = getUserId(ctx);
      const user = await ctx.prisma.user.findFirst({ where: { id: userId } })
      if (user === null) throw new Error('user not found')

      const valid = await compare(input.password, user.password)
      if (!valid) {
        throw new Error('Invalid password')
      }
      const salt = Number(process.env.HASH_SALT)

      const hashedPassword = await hash(input.newPassword, salt);

      const updatedUser = await ctx.prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } })
      return updatedUser;
    }
  })
})

export const CreateSubscriptionCheckoutSession = mutationField(t => {
  t.nullable.field('createSubscriptionCheckoutSession', {
    type: 'String',
    description: 'Create Stripe checkout session and return session ID',
    async resolve (_, __, ctx) {
      const userId = getUserId(ctx)
      if (userId === null) return null;

      const user = await ctx.prisma.user.findFirst({ where: { id: userId }, include: { subscription: true } })
      if (user === null) return null;
      if (user.subscription !== null) throw Error('user is already subscribed')

      const redirectURL = String(process.env.APP_HOST_URL)
      const { stripe } = stripeApi;

      // @TODO
      // Replace with env variable for subscription product ID
      const product = await stripe.products.retrieve('prod_KlbJ2OSScqDUNu');
      const prices = await stripe.prices.list({ product: product.id });
      const price = prices.data.pop();
      if (typeof price === 'undefined') return null;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: price.id, quantity: 1 }],
        mode: 'subscription',
        success_url: `${redirectURL}/subscription-confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${redirectURL}/subscriptions`,
        client_reference_id: user.id,
        customer_email: user.email
      });

      return session.id
    }
  })
})

export const CreateSubscription = mutationField(t => {
  t.nullable.field('createSubscription', {
    type: 'User',
    args: {
      input: nonNull(arg({ type: 'CreateSubscriptionInput' }))
    },
    async resolve (_source, args, ctx) {
      const userId = getUserId(ctx)
      const { input } = args;
      const session = await stripeApi.getCheckoutSession(input.checkoutSessionId)
      const metadata = extractMetadataFromCheckoutSession(session)

      let payload = generatePayloadFromMetadata(metadata)
      if (typeof session.subscription === 'string') {
        const subscrition = await stripeApi.getSubscription(session.subscription)
        const { plan } = subscrition;
        if (typeof plan !== 'undefined') {
          payload = generatePayloadFromPlan(plan)
        }
      }

      await ctx.prisma.subscription.create({
        data: {
          subscriptionId: String(metadata.subscription),
          price: payload.price,
          type: payload.type,
          userId: String(userId),
          metadata: JSON.stringify(metadata)
        }
      })
      const user = await ctx.prisma.user.findFirst({ where: { id: String(userId) }, include: { subscription: true } })
      return user;
    }
  })
})

export const CancelSubscription = mutationField(t => {
  t.nonNull.field('cancelSubscription', {
    type: 'Boolean',
    async resolve (_, __, ctx) {
      try {
        const userId = getUserId(ctx)

        const subscription = await ctx.prisma.subscription.findFirst({ where: { userId: userId } })
        if (subscription === null) throw new Error('user_not_subscribed')

        await stripeApi.cancelSubscription(subscription.subscriptionId)
        await ctx.prisma.subscription.delete({ where: { id: subscription.id } })
        return true;
      } catch (error) {
        return false;
      }
    }
  })
})
