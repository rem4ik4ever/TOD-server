import { v4 as uuidv4 } from 'uuid';
import { Column } from '@prisma/client';
import { ColumnResource } from 'src/api/resources';

export const columnResourceMock = jest.fn((): ColumnResource => {
  const columns: Column[] = [];
  const findById = async (id: string): Promise<Column> => {
    return await new Promise((resolve) => {
      const column = columns.filter(col => col.id === id).pop()
      if (column == null || typeof column === 'undefined') {
        return null;
      }
      return column
    })
  }
  const create = async (data: any): Promise<Column> => {
    return await new Promise(resolve => {
      const column: Column = {
        id: uuidv4(),
        ...data
      }
      columns.push(column)
      resolve(column)
    })
  }
  return {
    findById,
    create
  }
})
