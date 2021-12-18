import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition (t) {
    t.nonNull.string('id')
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.boolean('confirmed')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nullable.field('subscription', {
      type: 'Subscription',
      resolve (source, _, ctx) {
        return ctx.prisma.subscription.findFirst({ where: { userId: source.id } })
      }
    })
  }
})
