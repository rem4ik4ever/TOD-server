import { connectionFromArray } from 'graphql-relay'
import { extendType, intArg, nonNull } from 'nexus'
import { Context } from '../../context'
import { tableResource } from '../../resources'

export const DraftTablesQueries = extendType({
  type: 'Query',
  definition (t) {
    t.nonNull.list.field('drafts', {
      type: 'DataTable',
      resolve: async (_, __, ctx: Context) => {
        return await ctx.prisma.dataTable.findMany({ where: { status: 'draft' } })
      }
    })
    t.field('dataTable', {
      type: 'DataTable',
      args: {
        id: nonNull(intArg())
      },
      async resolve (_, args, ctx) {
        return await tableResource({ client: ctx.prisma }).findById(args.id)
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
