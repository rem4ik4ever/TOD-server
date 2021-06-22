import { User } from '.prisma/client';
import { UserResource } from '../../resources';
import { EmailConfirmationResource } from '../../resources/emailConfirmationResource';

export interface ConfirmUserEmail {
  userResource: UserResource
  emailConfirmationResource: EmailConfirmationResource
  token: string
}
// @todo missing test
export const confirmUserEmail = async ({ userResource, emailConfirmationResource, token }: ConfirmUserEmail): Promise<User> => {
  const emailConfirmation = await emailConfirmationResource.findEmailConfirmationById(token)
  if (emailConfirmation == null) throw new Error('not_found')
  if (emailConfirmation.confirmed) throw new Error('already_confirmed');

  const { result: user, error } = await userResource.findById(emailConfirmation.userId)
  if (error != null && typeof error !== 'undefined') throw new Error(error.message)
  if (user == null) throw new Error('user_not_found')

  const { result: updatedUser, error: updateError } = await userResource.updateUser(user.id, {
    confirmed: true
  })
  if (updateError != null && typeof updateError !== 'undefined') throw new Error(updateError.message)
  if (updatedUser == null) throw new Error('failed_confirm_user')

  await emailConfirmationResource.confirmEmail(token);

  return updatedUser;
}
