import { objectType } from 'nexus'

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
