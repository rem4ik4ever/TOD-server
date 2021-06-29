import { objectType } from 'nexus';
import { tableResource } from '../../resources';

export const EntryType = objectType({
  name: 'Entry',
  definition (t) {
    t.id('id')
    t.int('tableId')
    t.field('table', {
      type: 'DataTable',
      async resolve (root, __, ctx) {
        if (root.tableId == null) return null
        return await tableResource({ client: ctx.prisma }).findById(root.tableId)
      }
    })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  }
})
