import { MailTranporter } from '../../context';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path'

export interface SendTemplatePreviewEmailParams {
  transporter: MailTranporter
}

export const sendTemplatePreviewEmail = async ({ transporter }: SendTemplatePreviewEmailParams): Promise<boolean> => {
  const template = fs.readFileSync(path.resolve(__dirname, 'tmp.html'))
  const info = await transporter.sendMail({
    from: '"No-Reply" no-reply@vutable.com',
    to: 'rem4ik4ever@gmail.com',
    subject: 'Your template',
    text: 'This is template',
    html: template
  })

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  return true;
}
