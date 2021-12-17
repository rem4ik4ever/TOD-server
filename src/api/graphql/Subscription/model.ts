import { enumType, objectType } from 'nexus';

export const Subscription = objectType({
  name: 'Subscription',
  definition (t) {
    t.string('id')
    t.nonNull.int('price')
    t.nonNull.string('userId')
    t.nonNull.field('type', { type: 'SubscriptionType' })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})

export const SubscriptionType = enumType({
  name: 'SubscriptionType',
  members: [
    'ANNUAL',
    'MONTHLY'
  ]
})
