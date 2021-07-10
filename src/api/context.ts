import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { Session } from 'next-iron-session'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { ResqueSetup } from '../workers'
import { prisma } from './db'
import { EmailConfirmationResource, emailConfirmationResource, TableResource, tableResource, UserResource, userResource } from './resources'

export type MailTranporter = nodemailer.Transporter<SMTPTransport.SentMessageInfo>

interface Resources {
  user: UserResource
  emailConfirmation: EmailConfirmationResource
  dataTable: TableResource
}
const resources = (client: PrismaClient): Resources => ({
  user: userResource({ client }),
  emailConfirmation: emailConfirmationResource({ client }),
  dataTable: tableResource({ client })
})

export interface Context {
  prisma: PrismaClient
  req: Request & {session: Session}
  transporter: MailTranporter
  resque: ResqueSetup
}
export const createContext = (req: Request & {session: Session}, transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>, resque: ResqueSetup): Context => {
  return {
    req,
    prisma,
    transporter,
    resque,
    ...resources(prisma)
  }
}
