import { arg, idArg, inputObjectType, mutationField, nonNull } from 'nexus'
import { getUserId } from '../utils'

export const CreateEmailTemplateInput = inputObjectType({
  name: 'CreateEmailTemplateInput',
  definition (t) {
    t.nonNull.string('name')
    t.nonNull.string('template')
  }
})

export const UpdateEmailTemplateInput = inputObjectType({
  name: 'UpdateEmailTemplateInput',
  definition (t) {
    t.nonNull.string('name')
    t.nonNull.string('template')
  }
})

export const CreateEmailTemplate = mutationField(t => {
  t.field('createEmailTemplate', {
    type: 'EmailTemplate',
    args: {
      input: nonNull(arg({ type: 'CreateEmailTemplateInput' }))
    },
    async resolve (_, args, ctx) {
      const userId = getUserId(ctx)
      const table = await ctx.prisma.emailTemplate.create({
        data: {
          ...args.input,
          ownerId: String(userId)
        }
      });
      if (table == null) throw new Error('create_error')
      return table
    }
  })
})

export const UpdateEmailTemplate = mutationField('updateEmailTemplate', {
  type: 'EmailTemplate',
  args: {
    id: nonNull(idArg()),
    input: nonNull(arg({ type: 'UpdateEmailTemplateInput' }))
  },
  async resolve (_, args, ctx) {
    const { id, input: data } = args;
    const result = await ctx.prisma.emailTemplate.update({ where: { id }, data })
    return result;
  }
})
