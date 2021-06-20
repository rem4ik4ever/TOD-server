import { connectionFromArray } from 'graphql-relay'
import { extendType } from 'nexus'
import { Context } from '../../context'

export const DraftTablesQueries = extendType({
  type: 'Query',
  definition (t) {
    t.nonNull.list.field('drafts', {
      type: 'DataTable',
      resolve: async (_, __, ctx: Context) => {
        return await ctx.prisma.dataTable.findMany({ where: { status: 'draft' } })
      }
    })
    t.connectionField('dataTables', {
      type: 'DataTable',
      async resolve (_, args: any, ctx, info) {
        const result = await ctx.prisma.dataTable.findMany({ take: 100 })
        console.log({ info, result, args })
        return connectionFromArray(result, args)
      }
    })
  }
})
