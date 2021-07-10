import { User } from '.prisma/client';
import { UserResource } from '../../resources';
import { EmailConfirmationResource } from '../../resources/emailConfirmationResource';

export interface ConfirmUserEmail {
  userResource: UserResource
  emailConfirmationResource: EmailConfirmationResource
  token: string
}

export enum ConfirmUserEmailErrors {
  AlreadyConfirmed='already_confirmed'
}
// @todo missing test
export const confirmUserEmail = async ({ userResource, emailConfirmationResource, token }: ConfirmUserEmail): Promise<User> => {
  const emailConfirmation = await emailConfirmationResource.findEmailConfirmationById(token)
  if (emailConfirmation == null) throw new Error('not_found')
  if (emailConfirmation.confirmed) throw new Error(ConfirmUserEmailErrors.AlreadyConfirmed);

  const user = await userResource.findById(emailConfirmation.userId)
  if (user == null) throw new Error('user_not_found')

  const updatedUser = await userResource.updateUser(user.id, {
    confirmed: true
  })
  if (updatedUser == null) throw new Error('failed_confirm_user')

  await emailConfirmationResource.confirmEmail(token);

  return updatedUser;
}
