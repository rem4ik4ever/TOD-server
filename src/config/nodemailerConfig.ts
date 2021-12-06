import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const getConfiguration = async (): Promise<SMTPTransport.Options> => {
  const testAccount = await nodemailer.createTestAccount();
  const devConfiguration = {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  }
  return devConfiguration;
}

export const setupNodemailer = async (): Promise<nodemailer.Transporter<SMTPTransport.SentMessageInfo>> => {
  const settings = await getConfiguration();
  const transporter = nodemailer.createTransport(settings);

  return transporter;
}
