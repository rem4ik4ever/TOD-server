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
export const authenticateUser = async ({ userResource, data, compare }: AuthenticateUser): Promise<User> => {
  const { result: user, error } = await userResource.findByEmail(data.email);
  if (error != null) {
    // throw new Error(error.message)
    // @TODO notify bugsnag
  }
  if (user == null || (error != null)) {
    throw new Error('invalid_credentials')
  }
  const valid = await compare(data.password, user.password)
  if (!valid) {
    throw new Error('invalid_credentials')
  }
  if (!user.confirmed) {
    throw new Error('email_not_confirmed')
  }
  return user;
}
