import { connectionFromArray } from 'graphql-relay'
import { list, objectType } from 'nexus'
import { userResource } from '../../resources'

export const DataTable = objectType({
  name: 'DataTable',
  definition (t) {
    t.nonNull.string('id')
    t.string('name')
    t.string('status')
    t.nullable.string('fileKey')
    t.string('ownerId')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('owner', {
      type: 'User',
      async resolve (root, args, ctx) {
        if (root.ownerId == null) return null
        const user = await userResource({ client: ctx.prisma }).findById(root.ownerId)
        return user;
      }
    })
    t.field('columns', {
      type: list('Column'),
      async resolve (root, args, ctx) {
        return await ctx.column.allByTableId(root.id)
      }
    })
    t.connectionField('entries', {
      type: 'Entry',
      async resolve (root, args, ctx) {
        const result = await ctx.prisma.entry.findMany({
          where: {
            tableId: root.id
          }
        })
        return connectionFromArray(result, args)
      }
    })
  }
})
