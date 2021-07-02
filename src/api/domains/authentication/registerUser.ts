import { UserResource } from '../../resources'
import { hash } from 'bcryptjs';
import { User } from '.prisma/client';

export interface RegisterUser {
  userResource: UserResource
  data: {
    username: string
    email: string
    password: string
  }
}

const salt = (process.env.HASH_SALT != null) ? process.env.HASH_SALT : 10

export const registerUser = async ({ userResource, data }: RegisterUser): Promise<User> => {
  const userExists = await userResource.findByEmail(data.email)
  if (userExists != null) {
    throw new Error('user_exists')
  }
  const hashedPassword = await hash(data.password, salt);
  const payload = {
    ...data,
    password: hashedPassword
  }
  const user = await userResource.createUser(payload);
  if (user == null) {
    throw new Error('system_error')
  }
  return user;
}
