import { DataTable, PrismaClient } from '@prisma/client';

export interface TableResource {
  findById: (id: number) => Promise<DataTable|null>
}

export const tableResource = ({ client }: {client: PrismaClient}): TableResource => {
  const findById = async (id: number): Promise<DataTable|null> => {
    return await client.dataTable.findUnique({ where: { id } })
  }
  return {
    findById
  }
}
