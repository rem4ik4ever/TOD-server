import { DataTable } from '@prisma/client'
import { prisma } from 'src/api/db'
import { columnResource, tableResource } from 'src/api/resources'
import { populateTable } from '.'
import { entryResource } from '../../resources/entryResource'

const test = async (): Promise<DataTable> => {
  const result = await populateTable({
    tableResource: tableResource({ client: prisma }),
    columnResource: columnResource({ client: prisma }),
    entryResource: entryResource({ client: prisma }),
    tableId: 3
  })

  return result;
}

test().catch(err => console.log(err))
