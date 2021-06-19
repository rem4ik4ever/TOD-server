import server from './server';

const port: string = (process.env.SERVER_PORT != null) ? process.env.SERVER_PORT : '8080';

server.listen(port, () => {
  console.log(`GraphQL server running http://localhost:${port}/graphql`);
});
