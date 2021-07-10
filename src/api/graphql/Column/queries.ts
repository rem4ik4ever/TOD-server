import { intArg, list, nonNull, queryField } from 'nexus';
import { getUserId } from '../utils';

export const getTableColumns = queryField('getTableColumns', {
  type: list('Column'),
  args: {
    tableId: nonNull(intArg())
  },
  resolve: async (_, args, ctx) => {
    try {
      const ownerId = getUserId(ctx)
      const result = await ctx.prisma.column.findMany({ where: { table: { id: args.tableId, ownerId } } })
      console.log({ result })
      return result
    } catch (error) {
      return []
    }
  }
})
