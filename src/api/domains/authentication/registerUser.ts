import { UserResource } from '../../resources'
import { hash } from 'bcryptjs';
import { User } from '.prisma/client';
import { add } from 'date-fns'

export interface RegisterUser {
  userResource: UserResource
  data: {
    username: string
    email: string
    password: string
  }
}

const salt = Number(process.env.HASH_SALT)

export enum RegisterErrors {
  UserExists = 'user_exists'
}

export const registerUser = async ({ userResource, data }: RegisterUser): Promise<User> => {
  const userExists = await userResource.findByEmail(data.email)
  if (userExists != null) {
    throw new Error(RegisterErrors.UserExists)
  }
  const hashedPassword = await hash(data.password, salt);
  const payload = {
    ...data,
    password: hashedPassword,
    trialEnd: add(Date.now(), { days: 14 })
  }
  const user = await userResource.createUser(payload);
  if (user == null) {
    throw new Error('system_error')
  }
  return user;
}
