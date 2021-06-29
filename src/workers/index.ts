import { Worker, Scheduler, Queue } from 'node-resque';
import { connectionDetails } from './config';
import { jobs } from './jobs';
import { handleQueueEvents, handleSchedulerEvents, handleWorkerEvents } from './eventHandlers';

export interface ResqueSetup {
  worker: Worker
  scheduler: Scheduler
  queue: Queue
}
export const resqueSetup = (): ResqueSetup => {
  const worker = new Worker(
    { connection: connectionDetails, queues: ['default'] },
    jobs
  );
  const scheduler = new Scheduler({ connection: connectionDetails });
  const queue = new Queue({ connection: connectionDetails }, jobs);

  return {
    worker,
    scheduler,
    queue
  }
}
export interface ResqueBoot {
  scheduler: Scheduler
  worker: Worker
  queue: Queue
}

export async function boot ({ scheduler, worker, queue }: ResqueBoot): Promise<void> {
  console.log('Booting up node-resque')
  await worker.connect();
  worker.start().catch(err => console.log('Failed to start worker: ', err.message));

  await scheduler.connect();
  scheduler.start().catch(err => console.log('Filed to start scheduler', err.message));

  await queue.connect();

  handleWorkerEvents(worker);
  handleSchedulerEvents(scheduler);
  handleQueueEvents(queue)
  console.log('node-resque success')
}

export async function shutdown ({ scheduler, worker, queue }: ResqueSetup): Promise<void> {
  console.log('Gracefully shutting down Resque')
  await queue.end();
  await scheduler.end();
  await worker.end();
  console.log('Resque shutdown complete')
}

// and when you are done
// await queue.end()
// await scheduler.end()
// await worker.end()
