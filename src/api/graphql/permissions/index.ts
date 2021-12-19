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
  })
}

export const permissions = shield({
  Query: {
    emailTemplates: rules.isAuthenticated,
    // emailTemplate: rules.isAuthenticated,
    me: rules.isAuthenticated
  },
  Mutation: {
    createEmailTemplate: rules.isAuthenticated,
    updateEmailTemplate: rules.isAuthenticated,
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
    console.error(thrownThing)
    return new Error('Internal server error')
  }
})
