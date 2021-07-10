import { ConnectionArguments, connectionFromArray } from 'graphql-relay'
import { extendType, nonNull, stringArg } from 'nexus'
import { Context } from '../../context'
import { tableResource } from '../../resources'
import { getUserId } from '../utils'

export const DraftTablesQueries = extendType({
  type: 'Query',
  definition (t) {
    t.nonNull.list.field('drafts', {
      type: 'DataTable',
      resolve: async (_, __, ctx: Context) => {
        const ownerId = getUserId(ctx);
        console.log({ ownerId })
        return await ctx.prisma.dataTable.findMany({ where: { status: 'DRAFT', ownerId } })
      }
    })
    t.field('dataTable', {
      type: 'DataTable',
      args: {
        id: nonNull(stringArg())
      },
      async resolve (_, args, ctx) {
        return await tableResource({ client: ctx.prisma }).findById(args.id)
      }
    })
    t.connectionField('dataTables', {
      type: 'DataTable',
      async resolve (_, args: ConnectionArguments, ctx, info) {
        const ownerId = getUserId(ctx);
        const result = await ctx.prisma.dataTable.findMany({ where: { ownerId } })
        return connectionFromArray(result, args)
      }
    })
  }
})
