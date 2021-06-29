import { Column, Prisma, PrismaClient } from '@prisma/client';

export interface ColumnResource {
  findById: (id: string) => Promise<Column|null>
  create: (data: Prisma.ColumnCreateInput) => Promise<Column|null>
}

export const columnResource = ({ client }: {client: PrismaClient}): ColumnResource => {
  const findById = async (id: string): Promise<Column|null> => {
    return await client.column.findUnique({ where: { id } })
  }
  const create = async (data: Prisma.ColumnCreateInput): Promise<Column|null> => {
    const column = await client.column.create({ data })
    return column;
  }
  return {
    findById,
    create
  }
}
