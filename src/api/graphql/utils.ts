import { Context } from '../context'

export const getUserId = (context: Context): string|null => {
  try {
    return context.req.session.user.id
  } catch (err) {
    console.log(err)
    return null;
  }
}
