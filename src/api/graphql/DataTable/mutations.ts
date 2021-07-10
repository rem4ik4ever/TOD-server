import { arg, inputObjectType, mutationField, nonNull } from 'nexus'
import { getUserId } from '../utils'

export const DataTableInputType = inputObjectType({
  name: 'DataTableInput',
  definition (t) {
    t.nonNull.string('name')
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
