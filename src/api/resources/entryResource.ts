import { Entry, Prisma, PrismaClient } from '@prisma/client';

export interface EntryResource {
  findById: (id: string) => Promise<Entry|null>
  create: (data: Prisma.EntryCreateInput) => Promise<Entry|null>
  update: (id: string, data: Prisma.EntryUpdateInput) => Promise<Entry|null>
}

export const entryResource = ({ client }: {client: PrismaClient}): EntryResource => {
  const findById = async (id: string): Promise<Entry|null> => {
    return await client.entry.findUnique({ where: { id } })
  }
  const create = async (data: Prisma.EntryCreateInput): Promise<Entry|null> => {
    const entry = await client.entry.create({ data })
    return entry;
  }
  const update = async (id: string, data: Prisma.EntryUpdateInput): Promise<Entry|null> => {
    const entry = await client.entry.update({ where: { id }, data })
    return entry;
  }
  return {
    findById,
    create,
    update
  }
}
