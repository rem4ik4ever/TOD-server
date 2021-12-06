import { rule, shield } from 'graphql-shield';
import { Context } from '../../context';
import { getUserId } from '../utils';

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
    updateEmailTemplate: rules.isAuthenticated
  }
})
