import { rule, shield, and } from 'graphql-shield';
import { Context } from '../../context';
import { tableResource } from '../../resources';
import { getUserId } from '../utils';

const rules = {
  isAuthenticated: rule()(async (_parent, _args, ctx: Context) => {
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
  })
}

export const permissions = shield({
  Query: {
    dataTable: and(rules.isAuthenticated, rules.isTableOwner),
    dataTables: rules.isAuthenticated,
    getTableColumns: rules.isAuthenticated
  },
  Mutation: {
    createDataTable: rules.isAuthenticated
  }
})