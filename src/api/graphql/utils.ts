import { verify } from 'jsonwebtoken'
import { Context } from '../context'

export const getUserId = (context: Context): string|null => {
  const authHeader = context.req.get('Authorization')
  const secret = String(process.env.APP_SECRET)
  if (typeof authHeader === 'string') {
    const token = authHeader.replace('Bearer ', '')
    const verifiedToken: any = verify(token, secret)
    if (verifiedToken !== null) {
      return verifiedToken.userId
    }
  }
  return null
}
