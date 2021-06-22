import { User } from '.prisma/client';
import { MailTranporter } from '../../context';
import { EmailConfirmationResource } from '../../resources/emailConfirmationResource';
import nodemailer from 'nodemailer';

export interface SendConfirmUserEmail {
  emailConfirmationResource: EmailConfirmationResource
  user: User
  transporter: MailTranporter
}

export const sendConfirmUserEmail = async ({ emailConfirmationResource, user, transporter }: SendConfirmUserEmail): Promise<boolean> => {
  // check if user is not confirmed
  if (user.confirmed) return false

  // create emailConfirmation
  const emailConfirmation = await emailConfirmationResource.createEmailConfirmation(user.id)

  const hostUrl: string = 'http://localhost:8080'
  const token: string = emailConfirmation.id;

  const confirmUrl = `${hostUrl}/confirm/${token}`
  const info = await transporter.sendMail({
    from: '"No-Reply" no-reply@vutable.com',
    to: user.email,
    subject: 'Please Confirm your email',
    text: `Follow this link to confirm your email: ${confirmUrl}`,
    html: `Follow this link to confirm your email: <a href="${confirmUrl}">${confirmUrl}</a>`
  })

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  return true;
}
