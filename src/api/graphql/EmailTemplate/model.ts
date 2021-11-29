import { objectType } from 'nexus'
import { userResource } from '../../resources'

export const EmailTemplate = objectType({
  name: 'EmailTemplate',
  definition (t) {
    t.nonNull.string('id')
    t.string('name')
    t.string('ownerId')
    t.nullable.string('template')
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
  }
})
