import { DataTable, Prisma, PrismaClient } from '@prisma/client';

export interface TableResource {
  findById: (id: string) => Promise<DataTable|null>
  update: (id: string, data: any) => Promise<DataTable|null>
}

export const tableResource = ({ client }: {client: PrismaClient}): TableResource => {
  const findById = async (id: string): Promise<DataTable|null> => {
    return await client.dataTable.findUnique({ where: { id } })
  }
  const update = async (id: string, data: Prisma.DataTableUpdateInput): Promise<DataTable> => {
    return await client.dataTable.update({ where: { id }, data })
  }
  return {
    findById,
    update
  }
}
