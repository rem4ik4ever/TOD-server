import { Column, Prisma, PrismaClient } from '@prisma/client';

export interface ColumnResource {
  findById: (id: string) => Promise<Column|null>
  create: (data: Prisma.ColumnCreateInput) => Promise<Column|null>
  update: (id: string, data: Prisma.ColumnUpdateInput) => Promise<Column|null>
}

export const columnResource = ({ client }: {client: PrismaClient}): ColumnResource => {
  const findById = async (id: string): Promise<Column|null> => {
    return await client.column.findUnique({ where: { id } })
  }
  const create = async (data: Prisma.ColumnCreateInput): Promise<Column|null> => {
    const column = await client.column.create({ data })
    return column;
  }
  const update = async (id: string, data: any): Promise<Column|null> => {
    const column = await client.column.update({ where: { id }, data })
    return column
  }
  return {
    findById,
    create,
    update
  }
}
