import { Context } from '../context'

export const getUserId = (context: Context): string|null => {
  try {
    return context.req.session.get('user').id
  } catch (err) {
    console.log(err)
    throw err
  }
}
