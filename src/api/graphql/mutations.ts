import { nonNull, objectType, stringArg } from 'nexus';

export const Mutations = objectType({
  name: 'Mutation',
  definition (t) {
    t.nonNull.field('ping', {
      type: 'String',
      args: {
        text: nonNull(stringArg())
      },
      resolve: (_parent, args) => {
        return args.text;
      }
    })
  }
})
