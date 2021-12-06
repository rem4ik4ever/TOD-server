import { User } from '.prisma/client';
import { UserResource } from 'src/api/resources';

export interface AuthenticateUser {
  userResource: UserResource
  data: {
    email: string
    password: string
  }
  compare: (text: string, hash: string) => PromiseLike<boolean>
}
export enum AuthErrors {
  InvalidCredentials = 'invalid_credentials',
  EmailNotConfirmed='email_not_confirmed'
}

export const authenticateUser = async ({ userResource, data, compare }: AuthenticateUser): Promise<User> => {
  const user = await userResource.findByEmail(data.email);
  if (user == null) {
    throw new Error(AuthErrors.InvalidCredentials)
  }
  const valid = await compare(data.password, user.password)
  if (!valid) {
    throw new Error(AuthErrors.InvalidCredentials)
  }
  // if (!user.confirmed) {
  //  throw new Error(AuthErrors.EmailNotConfirmed)
  // }
  return user;
}
