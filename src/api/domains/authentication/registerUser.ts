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
  // verify that same user email does not exit
  const { result: userExists } = await userResource.findByEmail(data.email)
  if (userExists != null) {
    throw new Error('user_exists')
  }
  // create new user
  // check password strength
  // hash password
  const hashedPassword = await hash(data.password, salt);
  const { result: user, error } = await userResource.createUser({
    ...data,
    password: hashedPassword
  });
  if (user == null) {
    throw new Error('system_error')
  }
  if (error != null) {
    throw new Error(error.message);
  }
  // send confirmation email

  return user;
}
