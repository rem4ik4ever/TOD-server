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
        const ownerId = getUserId(ctx);
        if (ownerId === null) {
          return [];
        }
        return ctx.prisma.emailTemplate.findMany({ where: { ownerId } })
      }
    })
    t.field('emailTemplate', {
      type: 'EmailTemplate',
      args: {
        id: nonNull(stringArg())
      },
      resolve (_, args, ctx) {
        const { id } = args;
        return ctx.prisma.emailTemplate.findUnique({ where: { id } })
      }
    })
  }
})
