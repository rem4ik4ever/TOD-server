import { Prisma, PrismaClient, User } from '.prisma/client';

interface ActionError {
  message: string
}

export type UserResourceResponse = Promise<{result?: User, error?: ActionError|undefined|null}>

export interface UserResource {
  createUser: (data: Prisma.UserCreateInput) => UserResourceResponse
  updateUser: (id: string, data: Prisma.UserUpdateInput) => UserResourceResponse
  findById: (id: string) => UserResourceResponse
  findByEmail: (string: string) => UserResourceResponse
  deleteUser: (id: string) => UserResourceResponse
}

export function userResource ({ client }: {client: PrismaClient}): UserResource {
  console.log({ client })
  const createUser = async (data: Prisma.UserCreateInput): UserResourceResponse => {
    try {
      const result = await client.user.create({ data })
      console.log({ result })
      return { result, error: null }
    } catch (error) {
      return { error }
    }
  }
  const updateUser = async (id: string, data: Prisma.UserUpdateInput): UserResourceResponse => {
    try {
      const result = await client.user.update({ where: { id }, data })
      return { result }
    } catch (error) {
      return { error }
    }
  }
  const findById = async (id: string): UserResourceResponse => {
    try {
      const result = await client.user.findUnique({ where: { id } })
      if (result != null) {
        return { result }
      }
      throw new Error('not_found')
    } catch (error) {
      return { error }
    }
  }
  const findByEmail = async (email: string): UserResourceResponse => {
    try {
      const result = await client.user.findUnique({ where: { email } })
      if (result != null) {
        return { result }
      }
      throw new Error('not_found')
    } catch (error) {
      return { error }
    }
  }

  const deleteUser = async (id: string): UserResourceResponse => {
    try {
      const result = await client.user.delete({ where: { id } })
      return { result }
    } catch (error) {
      return { error }
    }
  }
  return {
    createUser,
    updateUser,
    deleteUser,
    findById,
    findByEmail
  }
}
