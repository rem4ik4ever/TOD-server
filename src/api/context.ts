import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { Session } from 'next-iron-session'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { ResqueSetup } from '../workers'
import { prisma } from './db'
import { ColumnResource, columnResource, EmailConfirmationResource, emailConfirmationResource, TableResource, tableResource, UserResource, userResource } from './resources'

export type MailTranporter = nodemailer.Transporter<SMTPTransport.SentMessageInfo>

interface Resources {
  user: UserResource
  emailConfirmation: EmailConfirmationResource
  dataTable: TableResource
  column: ColumnResource
}
const resources = (client: PrismaClient): Resources => ({
  user: userResource({ client }),
  emailConfirmation: emailConfirmationResource({ client }),
  dataTable: tableResource({ client }),
  column: columnResource({ client })
})

export interface ContextCore {
  prisma: PrismaClient
  req: Request & {session: Session}
  transporter: MailTranporter
  resque: ResqueSetup
}

export type Context = ContextCore & Resources

export const createContext = (req: Request & {session: Session}, transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>, resque: ResqueSetup): Context => {
  return {
    req,
    prisma,
    transporter,
    resque,
    ...resources(prisma)
  }
}
