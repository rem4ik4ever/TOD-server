import { arg, inputObjectType, mutationField, nonNull, stringArg } from 'nexus'
import { getUserId } from '../utils'

export const DataTableInputType = inputObjectType({
  name: 'DataTableInput',
  definition (t) {
    t.nonNull.string('name')
  }
})

export const DataTableUpdateInput = inputObjectType({
  name: 'DataTableUpdateInput',
  definition (t) {
    t.string('name')
    t.string('status')
    t.string('fileKey')
  }
})

export const CreateDataTable = mutationField(t => {
  t.field('createDataTable', {
    type: 'DataTable',
    args: {
      input: nonNull(arg({ type: 'DataTableInput' }))
    },
    async resolve (_, args, ctx) {
      const userId = getUserId(ctx)
      const table = await ctx.prisma.dataTable.create({
        data: {
          ...args.input,
          ownerId: String(userId)
        }
      });
      if (table == null) throw new Error('create_error')
      return table
    }
  })
})

export const UpdateDataTable = mutationField('updateDataTable', {
  type: 'DataTable',
  args: {
    id: nonNull(stringArg()),
    input: nonNull(arg({ type: 'DataTableUpdateInput' }))
  },
  async resolve (_, args, ctx) {
    const result = await ctx.dataTable.update(args.id, args.input)
    if (result !== null && typeof args.input.fileKey === 'string') {
      await ctx.resque.queue.enqueue('default', 'populateTable', [result.id])
    }
    return result;
  }
})
