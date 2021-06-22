import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { prisma } from './db'

export type MailTranporter = nodemailer.Transporter<SMTPTransport.SentMessageInfo>

export interface Context {
  prisma: PrismaClient
  req: any
  transporter: MailTranporter
}
export const createContext = (req: any, transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>): Context => {
  return {
    ...req,
    prisma,
    transporter
  }
}
