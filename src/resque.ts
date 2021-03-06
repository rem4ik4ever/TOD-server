import { initialize } from './server';
import { boot as bootResque, shutdown } from './workers'
import { createTerminus } from '@godaddy/terminus'

const port: string = (process.env.RESQUE_SERVER_PORT != null) ? process.env.RESQUE_SERVER_PORT : '8081';

async function boot (): Promise<any> {
  const { app, resque } = await initialize();
  const server = app.listen(port, () => {
    console.log('**Node Resque server is running**');
  });
  if (typeof resque !== 'undefined') {
    bootResque(resque).catch(err => console.log('Resque failed to boot', err.message))
  }

  const onHealthCheck = async (): Promise<void> => {
    console.log('health')
  }

  const onSignal = async (): Promise<void> => {
    console.log('NEED TO CLEANUP')

    if (typeof resque !== 'undefined') {
      await shutdown(resque)
    }
  }

  createTerminus(server, {
    signal: 'SIGINT',
    healthChecks: { '/healthCheck': onHealthCheck },
    onSignal
  })
}
boot().catch(err => console.log(err))
