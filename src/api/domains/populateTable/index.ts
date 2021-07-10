import { DataTable } from '@prisma/client'
import { ColumnResource, TableResource } from '../../resources'
import { EntryResource } from '../../resources/entryResource'
import { downloadCSV, parseCSV, saveColumns } from './helpers'

interface PopulateTableParams {
  tableResource: TableResource
  columnResource: ColumnResource
  entryResource: EntryResource
  tableId: string
}

export const populateTable = async ({ tableResource, columnResource, entryResource, tableId }: PopulateTableParams): Promise<DataTable> => {
  const table = await tableResource.findById(tableId)
  if (table == null) throw new Error('not_found')
  if (table.fileKey == null) throw new Error('no_table_filekey')

  // download file
  console.log('Downloading file')
  const fileStream: any = await downloadCSV(table.fileKey)
  // parse file
  const csv = await parseCSV(fileStream.Body)
  // save columns
  console.log('Saving columns')
  const columns = await saveColumns(columnResource, csv[0], tableId)
  console.log('Columns: ', columns)
  // save entries

  for (let i = 1; i < csv.length; i += 1) {
    const entry = await entryResource.create({
      table: { connect: { id: tableId } }
    })
    const entryValues = csv[i].map((val, index) => ({
      value: val,
      columnId: columns[index].id
    }))
    if (entry != null) {
      await entryResource.update(entry.id, {
        values: {
          createMany: { data: entryValues }
        }
      })
    }
  }

  // save entry values

  return table;
}
