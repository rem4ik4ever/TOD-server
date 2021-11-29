// import { ConnectionArguments, connectionFromArray } from 'graphql-relay'
import { extendType, nonNull, stringArg } from 'nexus'
import { Context } from '../../context'
import { getUserId } from '../utils'

export const EmailTemplateQueries = extendType({
  type: 'Query',
  definition (t) {
    t.nonNull.list.field('emailTemplates', {
      type: 'EmailTemplate',
      resolve: (_, __, ctx: Context) => {
        try {
          const ownerId = getUserId(ctx);
          if (ownerId === null) {
            return [];
          }
          return ctx.prisma.emailTemplate.findMany({ where: { ownerId } })
        } catch (error) {
          console.log('ERR', error)
          return [];
        }
      }
    })
    t.field('emailTemplate', {
      type: 'EmailTemplate',
      args: {
        id: nonNull(stringArg())
      },
      async resolve (_, args, ctx) {
        const { id } = args;
        return await ctx.prisma.emailTemplate.findUnique({ where: { id } })
      }
    })
  }
})
