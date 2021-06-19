import { connectionFromArray } from 'graphql-relay'
import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { Context } from '../context'

export const DataTable = objectType({
  name: 'DataTable',
  definition (t) {
    t.nonNull.id('id')
    t.string('name')
    t.string('status')
    t.string('fileKey')
  }
})

export const DraftTablesQuery = extendType({
  type: 'Query',
  definition (t) {
    t.nonNull.list.field('drafts', {
      type: 'DataTable',
      resolve: async (_, __, ctx: Context) => {
        return await ctx.db.dataTable.findMany({ where: { status: 'draft' } })
      }
    })
    t.connectionField('dataTables', {
      type: 'DataTable',
      async resolve (_, args: any, ctx, info) {
        const result = await ctx.db.dataTable.findMany({ take: 100 })
        console.log({ info, result, args })
        return connectionFromArray(result, args)
      }
    })
  }
})

export const CreateDataTable = extendType({
  type: 'Mutation',
  definition (t) {
    t.nonNull.field('createDataTable', {
      type: 'DataTable',
      args: {
        name: nonNull(stringArg()),
        fileKey: nonNull(stringArg())
      },
      resolve (_, args, ctx) {
        const draft = {
          name: args.name,
          fileKey: args.fileKey,
          status: 'draft'
        }
        return ctx.db.dataTable.create({ data: draft })
      }
    })
  }
})
