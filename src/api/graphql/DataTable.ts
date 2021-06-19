import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { DataTable as IDataTable } from '../db'

export const DataTable = objectType({
  name: 'DataTable',
  definition (t) {
    t.id('id')
    t.string('name')
    t.string('status')
    t.string('fileKey')
  }
})

export const DraftTablesQuery = extendType({
  type: 'Query',
  definition (t) {
    t.nonNull.list.field('drafts', {
      type: 'DataTable',
      resolve (_root, _args, ctx) {
        return ctx.db.dataTables.filter((table: IDataTable) => table.status === 'draft')
      }
    })
  }
})

export const CreateDataTable = extendType({
  type: 'Mutation',
  definition (t) {
    t.nonNull.field('createDataTable', {
      type: 'DataTable',
      args: {
        name: nonNull(stringArg()),
        fileKey: nonNull(stringArg())
      },
      resolve (_root, args, ctx) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        const nextId: number = ctx.db.dataTables.length + 1;
        const draft = {
          id: nextId,
          name: args.name,
          fileKey: args.fileKey,
          status: 'draft'
        }
        ctx.db.dataTables.push(draft)
        return draft;
      }
    })
  }
})
