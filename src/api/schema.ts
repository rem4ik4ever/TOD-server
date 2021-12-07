import { join } from 'path';
import { makeSchema, connectionPlugin } from 'nexus';
import * as types from './graphql';
// import { applyMiddleware } from 'graphql-middleware';
// import { permissions } from './graphql/permissions';

export const schemaWithoutPermissions = makeSchema({
  types,
  plugins: [connectionPlugin({
    includeNodesField: true,
    strictArgs: true,
    cursorFromNode (node) {
      return node.id
    }
  })],
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
        module: '@prisma/client',
        alias: 'prisma'
      }
    ]
  }
})

// export const schema = applyMiddleware(schemaWithoutPermissions, permissions)
export const schema = schemaWithoutPermissions
