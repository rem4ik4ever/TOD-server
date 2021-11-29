import { Context } from '../context'

export const getUserId = (context: Context): string|null => {
  try {
    console.log('context', context)
    return context.req.session.get('user').id
  } catch (err) {
    console.log(err)
    return null;
  }
}
