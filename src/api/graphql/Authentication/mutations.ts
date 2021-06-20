import { arg, inputObjectType, mutationField, nonNull } from 'nexus';
import { registerUser } from '../../domains/authentication';
import { userResource } from '../../resources';

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
      console.log({ GQL_CLIENT: ctx.prisma })
      const { username, email, password } = args.input;
      const user = await registerUser({
        userResource: userResource({ client: ctx.prisma }),
        data: {
          username,
          email,
          password
        }
      })
      return user;
    }
  })
})
