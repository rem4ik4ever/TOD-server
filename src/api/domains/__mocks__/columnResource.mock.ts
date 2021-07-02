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
  const update = async (id: string, data: any): Promise<Column|null> => {
    return await new Promise(resolve => {
      const col = columns.filter(c => c.id === id).pop();
      if (col == null) resolve(null)
      else {
        const idx = columns.findIndex((c) => c.id === id)
        columns[idx] = {
          ...columns[idx],
          ...col
        }
        resolve(columns[idx])
      }
    })
  }
  return {
    findById,
    create,
    update
  }
})
