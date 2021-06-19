// tests/__helpers.ts                                            // 1
import getPort, { makeRange } from 'get-port';
import { GraphQLClient } from 'graphql-request';
import server from '../../../server';

interface TestContext {
  client: GraphQLClient | null
}
export function createTestContext (): TestContext {
  const ctx: TestContext = { client: null };
  const graphqlCtx = graphqlTestContext();
  beforeEach(async () => { // 2
    const client = await graphqlCtx.before();
    Object.assign(ctx, {
      client
    });
  });
  afterEach(async () => { // 3
    await graphqlCtx.after();
  });
  return ctx; // 8
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function graphqlTestContext () {
  let serverInstance: any = null;
  return {
    async before () {
      const port = await getPort({ port: makeRange(4000, 6000) }); // 4
      serverInstance = await server.listen({ port }); // 5
    },
    async after () {
      serverInstance?.close(); // 7
    }
  };
}
