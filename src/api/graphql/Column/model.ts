import { objectType } from 'nexus';
import { tableResource } from '../../resources';

export const ColumnType = objectType({
  name: 'Column',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.string('field')
    t.nonNull.string('header')
    t.nonNull.string('width')
    t.int('minWidth')
    t.nonNull.string('align')
    t.nonNull.boolean('hidden')
    t.nonNull.int('tableId')
    t.field('table', {
      type: 'DataTable',
      resolve: async (root, _, ctx) => {
        try {
          const result = await tableResource({ client: ctx.prisma }).findById(root.tableId)
          return result;
        } catch (error) {
          return null;
        }
      }
    })
  }
})
