import { getObject } from 'src/aws/s3';
import { parse } from 'papaparse'
import { ColumnResource } from 'src/api/resources';
import { Column } from '.prisma/client';

export const downloadCSV = async (fileKey: string): Promise<ReadableStream> => {
  const params = {
    Bucket: 'todbucket195016-dev',
    Key: 'public/86703b5c-6ec4-4610-8d19-4585801c854e_71917b5c-392f-4bfa-b088-74555dbb2c24'
  }
  const stream = await getObject(params)

  return stream;
}
export const parseCSV = async (stream: any): Promise<string[][]> => {
  const data: string[][] = []
  console.log('parsing csv')
  return await new Promise((resolve, reject) => {
    parse(stream, {
      encoding: 'utf8',
      header: false,
      step: (step: any) => {
        console.log({ step: step.data })
        data.push(step.data)
      },
      complete: () => {
        console.log({ complete: data })
        resolve(data)
      },
      error: error => {
        console.log(error)
        reject(error)
      }
    })
  })
}

export const saveColumns = async (columnsResource: ColumnResource, row: string[], tableId: number): Promise<Column[]> => {
  const columns: Column[] = [];
  // eslint-disable-next-line @typescript-eslint/no-for-in-array
  for (const index in row) {
    const item = row[index]
    const params = {
      field: item,
      header: item,
      width: 'auto',
      minWidth: 100,
      align: 'START',
      hidden: false,
      table: { connect: { id: tableId } }
    }
    const column = await columnsResource.create(params)
    if (column != null) {
      columns.push(column)
    }
  }
  return columns;
}
