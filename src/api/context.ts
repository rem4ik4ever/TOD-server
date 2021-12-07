import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { IronSession } from 'iron-session'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { ResqueSetup } from '../workers'
import { prisma } from './db'
import { EmailConfirmationResource, emailConfirmationResource, UserResource, userResource } from './resources'

export type MailTranporter = nodemailer.Transporter<SMTPTransport.SentMessageInfo>

interface Resources {
  user: UserResource
  emailConfirmation: EmailConfirmationResource
}
const resources = (client: PrismaClient): Resources => ({
  user: userResource({ client }),
  emailConfirmation: emailConfirmationResource({ client })
})

export interface ContextCore {
  prisma: PrismaClient
  req: Request & {session: IronSession & {user: {id: string}}}
  transporter: MailTranporter
  resque: ResqueSetup | undefined
}

export type Context = ContextCore & Resources

export const createContext = (req: Request & {session: IronSession & {user: {id: string}}}, transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>, resque: ResqueSetup | undefined): Context => {
  return {
    req,
    prisma,
    transporter,
    resque,
    ...resources(prisma)
  }
}
