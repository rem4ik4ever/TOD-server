import getPort, { makeRange } from 'get-port'
import { GraphQLClient } from 'graphql-request'
import server from '../../../server'

interface TestContext {
  client: GraphQLClient | null
}

export function createTextContext (): TestContext {
  const ctx = { client: null };
  const graphqlCtx = graphqlTestContext()

  beforeEach(async () => {
    const client = await graphqlCtx.before();

    Object.assign(ctx, {
      client
    })
  })

  afterEach(async () => {
    await graphqlCtx.after()
  })

  return ctx;
}

function graphqlTestContext () {
  const serverInstance = null;

  return {
    async before () {
      const port = await getPort({ port: makeRange(4000, 6000) })
      serverInstance = await server.listen({ port })

      return new GraphQLClient(`http://localhost:${port}`)
    },
    async after () {
      serverInstance?.server.close();
    }
  }
}
