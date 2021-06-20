import { join } from 'path';
import { makeSchema, connectionPlugin } from 'nexus';
import * as types from './graphql';
import { nexusPrisma } from 'nexus-plugin-prisma';

export const schema = makeSchema({
  types,
  plugins: [connectionPlugin(), nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'schema.graphql')
  },
  contextType: {
    module: join(__dirname, './context.ts'),
    export: 'Context'
  },
  sourceTypes: {
    modules: [
      {
        module: require.resolve('.prisma/client/index.d.ts'),
        alias: 'prisma'
      }
    ]
  }
})
