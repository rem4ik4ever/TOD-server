export interface DataTable {
  id: number
  name: string
  status: string
  fileKey: string
}

export interface Db {
  dataTables: DataTable[]
}

export const db: Db = {
  dataTables: [
    {
      id: 1,
      name: 'rem',
      status: 'draft',
      fileKey: 'filekey1'
    }
  ]
}
