import { objectType } from 'nexus';

export const Query = objectType({
  name: 'Query',
  definition (t) {
    t.nonNull.field('ok', {
      type: 'Boolean',
      resolve: (_parent, _args, ctx) => {
        return true
      }
    })
  }
})
