import { rule, shield, and } from 'graphql-shield';
import { Context } from '../../context';
import { tableResource } from '../../resources';
import { getUserId } from '../utils';

const rules = {
  isAuthenticated: rule()((_parent, _args, ctx: Context) => {
    const userId = getUserId(ctx);
    return Boolean(userId)
  }),
  isTableOwner: rule()(async (_, args, ctx: Context) => {
    const userId = getUserId(ctx)
    const table = await tableResource({ client: ctx.prisma }).findById(args.id)
    if (table === null) {
      return false;
    }
    return userId === table.ownerId
  }),
  isTemplateOwner: rule()(async (args, ctx: Context) => {
    const userId = getUserId(ctx);
    const { templateId } = args;
    if (userId === null) return false;

    const templateExists = await ctx.prisma.emailTemplate.count({ where: { id: templateId, ownerId: userId } })
    if (templateExists === 1) {
      return true;
    }
    return false;
  })
}

export const permissions = shield({
  Query: {
    dataTable: and(rules.isAuthenticated, rules.isTableOwner),
    dataTables: rules.isAuthenticated,
    emailTemplate: rules.isAuthenticated,
    emailTemplates: rules.isTemplateOwner,
    getTableColumns: rules.isAuthenticated,
    me: rules.isAuthenticated
  },
  Mutation: {
    createDataTable: rules.isAuthenticated,
    updateColumn: rules.isAuthenticated,
    createEmailTemplate: rules.isAuthenticated,
    updateEmailTemplate: rules.isAuthenticated
  }
})
