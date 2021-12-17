import { arg, inputObjectType, mutationField, nonNull } from 'nexus';
import { getUserId } from '../utils';
import stripeApi, { extractMetadataFromCheckoutSession, StripeMetadata } from 'src/lib/stripe'
import Stripe from 'stripe';
import { SubscriptionType } from '@prisma/client';

export const CreateSubscriptionInput = inputObjectType({
  name: 'CreateSubscriptionInput',
  definition (t) {
    t.nonNull.string('checkoutSessionId')
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
        console.log({ subscrition, plan })
        if (plan != null) {
          payload = generatePayloadFromPlan(plan)
        }
      }

      // Fetch subscription from stripe
      // Save subscription into in DB
      await ctx.prisma.subscription.create({
        data: {
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
