import { objectType } from 'nexus';
import { tableResource } from '../../resources';

export const ColumnType = objectType({
  name: 'Column',
  definition (t) {
    t.nonNull.string('id')
    t.nonNull.string('field')
    t.nonNull.string('header')
    t.nonNull.string('width')
    t.int('minWidth')
    t.nonNull.string('align')
    t.nonNull.boolean('hidden')
    t.nonNull.string('tableId')
    t.field('table', {
      type: 'DataTable',
      resolve: async (root, _, ctx) => {
        const result = await tableResource({ client: ctx.prisma }).findById(root.tableId)
        if (result == null) throw new Error('not_found')
        return result;
      }
    })
  }
})
