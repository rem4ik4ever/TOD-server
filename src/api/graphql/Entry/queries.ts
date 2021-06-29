import { extendType, nonNull, stringArg } from 'nexus';
import { entryResource } from '../../resources/entryResource';

export const queries = extendType({
  type: 'Query',
  definition (t) {
    t.field('entry', {
      type: 'Entry',
      args: {
        id: nonNull(stringArg())
      },
      resolve: async (_, args, ctx) => {
        return await entryResource({ client: ctx.prisma }).findById(args.id)
      }
    })
  }
})
