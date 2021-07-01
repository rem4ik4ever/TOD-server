import { intArg, list, nonNull, queryField } from 'nexus';

export const getTableColumns = queryField('getTableColumns', {
  type: list('Column'),
  args: {
    tableId: nonNull(intArg())
  },
  resolve: async (_, args, ctx) => {
    try {
      const result = await ctx.prisma.column.findMany({ where: { tableId: args.tableId } })
      console.log({ result })
      return result
    } catch (error) {
      return []
    }
  }
})
