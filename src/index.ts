import { createTerminus } from '@godaddy/terminus';
import { initialize } from './server';

const port: string = (process.env.PORT != null) ? process.env.PORT : '8080';

async function boot (): Promise<any> {
  const { app, resque } = await initialize();
  const server = app.listen(port, () => {
    console.log(`GraphQL server running http://localhost:${port}/graphql`);
  });
  if (typeof resque !== 'undefined') {
    await resque.queue.connect();
  }

  const onHealthCheck = async (): Promise<void> => {
    console.log('health')
  }

  const onSignal = async (): Promise<void> => {
    console.log('CLEANING UP SERVER')

    if (typeof resque !== 'undefined') {
      await resque.queue.end()
    }
  }

  createTerminus(server, {
    signal: 'SIGINT',
    healthChecks: { '/healthCheck': onHealthCheck },
    onSignal
  })
}
boot().catch(err => console.log(err))
