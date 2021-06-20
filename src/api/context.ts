import { PrismaClient } from '@prisma/client'
import { prisma } from './db'
export interface Context {
  prisma: PrismaClient
  req: any
}
export const createContext = (req: any): Context => {
  return {
    ...req,
    prisma
  }
}
