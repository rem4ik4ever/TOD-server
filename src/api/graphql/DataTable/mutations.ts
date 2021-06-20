import { arg, inputObjectType, mutationField, nonNull } from 'nexus'

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
