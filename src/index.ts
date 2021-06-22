import { initialize } from './server';

const port: string = (process.env.SERVER_PORT != null) ? process.env.SERVER_PORT : '8080';

async function boot (): Promise<any> {
  const server = await initialize();
  server.listen(port, () => {
    console.log(`GraphQL server running http://localhost:${port}/graphql`);
  });
}

boot().catch(err => console.log(err))
