import { queryField } from 'nexus';
import { userResource } from '../../resources';
import { getUserId } from '../utils';

export const Me = queryField('me', {
  type: 'User',
  resolve: async (_, _args, ctx) => {
    const id = getUserId(ctx)
    if (typeof id !== 'string') {
      throw new Error('not_authorized')
    }
    const user = await userResource({ client: ctx.prisma }).findById(id)
    if (user == null) {
      throw new Error('authorized_user_not_found')
    }
    return user;
  }
})
