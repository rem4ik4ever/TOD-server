import { arg, inputObjectType, mutationField, nonNull } from 'nexus';
import { registerUser } from '../../domains/authentication';
import { sendConfirmUserEmail } from '../../domains/authentication/sendConfirmUserEmail';
import { userResource } from '../../resources';
import { emailConfirmationResource } from '../../resources/emailConfirmationResource';

export const RegisterInput = inputObjectType({
  name: 'RegisterUserInput',
  definition (t) {
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.string('password')
  }
})

export const Register = mutationField(t => {
  t.field('register', {
    type: 'User',
    args: {
      input: nonNull(arg({ type: 'RegisterUserInput' }))
    },
    resolve: async (_, args, ctx) => {
      const { username, email, password } = args.input;
      const user = await registerUser({
        userResource: userResource({ client: ctx.prisma }),
        data: {
          username,
          email,
          password
        }
      })
      await sendConfirmUserEmail({
        emailConfirmationResource: emailConfirmationResource({ client: ctx.prisma }),
        user,
        transporter: ctx.transporter
      })
      return user;
    }
  })
})
