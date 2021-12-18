import { Context } from '../context'

export const getUserId = (context: Context): string => {
  try {
    return context.req.session.user.id
  } catch (err) {
    throw new Error('not_authorized')
  }
}
