import { connectionFromArray } from 'graphql-relay'
import { arg, extendType, inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { Context } from '../context'

export const DataTable = objectType({
  name: 'DataTable',
  definition (t) {
    t.int('id')
    t.string('name')
    t.string('status')
    t.nullable.string('fileKey')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  }
})

export const DraftTablesQuery = extendType({
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

export const DataTableInputType = inputObjectType({
  name: 'DataTableInput',
  definition (t) {
    t.nonNull.string('name')
    t.nonNull.string('status')
    t.nonNull.string('fileKey')
  }
})

export const CreateDataTable = mutationField(t => {
  t.field('createDataTable', {
    type: 'DataTable',
    args: {
      input: nonNull(arg({ type: 'DataTableInput' }))
    },
    resolve (_, args, ctx) {
      console.log(args)
      return ctx.prisma.dataTable.create({ data: args.input });
    }
  })
})
