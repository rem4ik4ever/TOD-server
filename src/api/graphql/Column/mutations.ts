import { arg, inputObjectType, mutationField, nonNull, stringArg } from 'nexus';
import { columnResource } from '../../resources';

export const updateColumnInput = inputObjectType({
  name: 'UpdateColumnInput',
  definition (t) {
    t.string('field')
    t.string('header')
    t.string('width')
    t.int('minWidth')
    t.string('align')
    t.boolean('hidden')
  }
})
export const updateColumn = mutationField('updateColumn', {
  type: 'Column',
  args: {
    id: nonNull(stringArg()),
    input: nonNull(arg({ type: 'UpdateColumnInput' }))
  },
  async resolve (_, args, ctx) {
    return await columnResource({ client: ctx.prisma }).update(args.id, args.input)
  }
})
