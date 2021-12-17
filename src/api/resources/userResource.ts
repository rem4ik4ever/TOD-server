import { Prisma, PrismaClient, User } from '.prisma/client';

export type UserResourceResponse = Promise<User|null>

export interface UserResource {
  createUser: (data: Prisma.UserCreateInput) => UserResourceResponse
  updateUser: (id: string, data: Prisma.UserUpdateInput) => UserResourceResponse
  findById: (id: string) => UserResourceResponse
  findByEmail: (string: string) => UserResourceResponse
  deleteUser: (id: string) => UserResourceResponse
}

export function userResource ({ client }: {client: PrismaClient}): UserResource {
  const createUser = async (data: Prisma.UserCreateInput): UserResourceResponse => {
    const user = await client.user.create({ data })
    return user;
  }
  const updateUser = async (id: string, data: Prisma.UserUpdateInput): UserResourceResponse => {
    const user = await client.user.update({ where: { id }, data })
    return user;
  }
  const findById = async (id: string): UserResourceResponse => {
    const user = await client.user.findUnique({ where: { id }, include: { subscription: true } })
    return user;
  }
  const findByEmail = async (email: string): UserResourceResponse => {
    const user = await client.user.findUnique({ where: { email } })
    return user
  }

  const deleteUser = async (id: string): UserResourceResponse => {
    const user = await client.user.delete({ where: { id } })
    return user;
  }
  return {
    createUser,
    updateUser,
    deleteUser,
    findById,
    findByEmail
  }
}
