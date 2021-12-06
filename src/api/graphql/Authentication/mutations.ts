import { arg, inputObjectType, mutationField, nonNull, stringArg } from 'nexus';
import { RegisterErrors, registerUser } from '../../domains/authentication';
import { authenticateUser, AuthErrors } from '../../domains/authentication/authenticateUser';
import { confirmUserEmail, ConfirmUserEmailErrors } from '../../domains/authentication/confirmUserEmail';
import { userResource } from '../../resources';
import { emailConfirmationResource } from '../../resources/emailConfirmationResource';
import { compare } from 'bcryptjs';

export const RegisterInput = inputObjectType({
  name: 'RegisterUserInput',
  definition (t) {
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.string('password')
  }
})

export const LoginInput = inputObjectType({
  name: 'LoginUserInput',
  definition (t) {
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
      try {
        const { username, email, password } = args.input;
        const user = await registerUser({
          userResource: userResource({ client: ctx.prisma }),
          data: {
            username,
            email,
            password
          }
        })
        if (typeof ctx.resque !== 'undefined') {
          await ctx.resque.queue.enqueue('default', 'sendConfirmationEmail', [user.id])
        }
        return user;
      } catch (error) {
        if (Object.values(RegisterErrors).includes(error.message)) {
          return error;
        } else {
          throw error
        }
      }
    }
  })
})

export const ConfirmEmail = mutationField(t => {
  t.field('confirmEmail', {
    type: 'User',
    args: {
      token: nonNull(stringArg())
    },
    resolve: async (_, args, ctx) => {
      try {
        const user = await confirmUserEmail({
          userResource: userResource({ client: ctx.prisma }),
          emailConfirmationResource: emailConfirmationResource({ client: ctx.prisma }),
          token: args.token
        })
        return user;
      } catch (error) {
        if (Object.values(ConfirmUserEmailErrors).includes(error.message)) {
          return error;
        } else {
          throw error;
        }
      }
    }
  })
})

export const Login = mutationField(t => {
  t.field('login', {
    type: 'User',
    args: {
      input: nonNull(arg({ type: 'LoginUserInput' }))
    },
    resolve: async (_, args, ctx) => {
      try {
        const user = await authenticateUser({ userResource: userResource({ client: ctx.prisma }), data: args.input, compare })

        ctx.req.session.set('user', { id: user.id })
        await ctx.req.session.save()
        return user
      } catch (error) {
        if (Object.values(AuthErrors).includes(error.message)) {
          return error
        } else {
          throw error;
        }
      }
    }
  })
})

export const Logout = mutationField(t => {
  t.field('logout', {
    type: 'Boolean',
    resolve: async (_, _args, ctx) => {
      ctx.req.session.destroy()
      return true
    }
  })
})
