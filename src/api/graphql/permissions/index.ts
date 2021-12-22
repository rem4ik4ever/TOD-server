import { rule, shield } from 'graphql-shield';
import { Context } from '../../context';
import { getUserId } from '../utils';
import * as Sentry from '@sentry/node';

const rules = {
  isAuthenticated: rule()(async (_parent, _args, ctx: Context) => {
    const userId = getUserId(ctx);
    return Boolean(userId)
  }),
  isTemplateOwner: rule()(async (args, ctx: Context) => {
    const userId = getUserId(ctx);
    const { templateId } = args;
    if (userId === null) return false;

    const templateExists = await ctx.prisma.emailTemplate.count({ where: { id: templateId } })
    if (templateExists === 1) {
      return true;
    }
    return false;
  }),
  subscribedOrFreeTrial: rule()(async (_, __, ctx: Context) => {
    const userId = getUserId(ctx)
    const user = await ctx.prisma.user.findUnique({ where: { id: userId }, include: { subscription: true } })
    if (user === null) return false;
    console.log('checking subscription')
    if (user.subscription !== null) {
      return true
    }

    console.log('no subscription')
    const trialEnd = new Date(user.trialEnd).getTime()
    if (trialEnd > Date.now()) {
      return true;
    }
    console.log('trial expired subscription')
    return 'trial_has_expired'
  })
}

export const permissions = shield({
  Query: {
    emailTemplates: rules.isAuthenticated,
    // emailTemplate: rules.isAuthenticated,
    me: rules.isAuthenticated
  },
  Mutation: {
    createEmailTemplate: rules.subscribedOrFreeTrial,
    updateEmailTemplate: rules.subscribedOrFreeTrial,
    createSubscription: rules.isAuthenticated,
    createSubscriptionCheckoutSession: rules.isAuthenticated,
    updatePassword: rules.isAuthenticated,
    updateProfile: rules.isAuthenticated,
    deactivateProfile: rules.isAuthenticated,
    cancelSubscription: rules.isAuthenticated
  }
},
{
  fallbackError: async (thrownThing) => {
    Sentry.captureException(thrownThing)
    console.error('FallbackError:', thrownThing)
    return new Error('Internal server error')
  }
})
