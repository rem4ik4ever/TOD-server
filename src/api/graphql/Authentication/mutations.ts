import { arg, inputObjectType, mutationField, nonNull, stringArg } from 'nexus';
import { registerUser } from '../../domains/authentication';
import { authenticateUser } from '../../domains/authentication/authenticateUser';
import { confirmUserEmail } from '../../domains/authentication/confirmUserEmail';
import { userResource } from '../../resources';
import { emailConfirmationResource } from '../../resources/emailConfirmationResource';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

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
      const { username, email, password } = args.input;
      const user = await registerUser({
        userResource: userResource({ client: ctx.prisma }),
        data: {
          username,
          email,
          password
        }
      })
      try {
        await ctx.resque.queue.enqueue('default', 'sendConfirmationEmail', [user.id])
      } catch (error) {
        // @TODO notify bugsnag
        console.log(error)
      }
      return user;
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
      const user = await confirmUserEmail({
        userResource: userResource({ client: ctx.prisma }),
        emailConfirmationResource: emailConfirmationResource({ client: ctx.prisma }),
        token: args.token
      })
      return user;
    }
  })
})

export const Login = mutationField(t => {
  t.field('login', {
    type: 'AuthType',
    args: {
      input: nonNull(arg({ type: 'LoginUserInput' }))
    },
    resolve: async (_, args, ctx) => {
      const user = await authenticateUser({ userResource: userResource({ client: ctx.prisma }), data: args.input, compare })
      const { APP_SECRET } = process.env;
      if (APP_SECRET == null) {
        throw new Error('missing_app_secret')
      }
      const jwt = sign({ userId: user.id }, APP_SECRET, { expiresIn: '7 days' })
      return {
        user,
        token: jwt
      };
    }
  })
})
