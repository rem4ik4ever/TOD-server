// //////////////////////
// REGISTER FOR EVENTS //
// //////////////////////

import { Queue, Scheduler, Worker } from 'node-resque';

export const handleWorkerEvents = (worker: Worker): void => {
  worker.on('start', () => {
    console.log('worker started');
  });
  worker.on('end', () => {
    console.log('worker ended');
  });
  worker.on('cleaning_worker', (worker, pid) => {
    console.log(`cleaning old worker ${worker.id}`);
  });
  worker.on('poll', (queue) => {
    console.log(`worker polling ${queue}`);
  });
  worker.on('ping', (time) => {
    console.log(`worker check in @ ${time}`);
  });
  worker.on('job', (queue, job) => {
    console.log(`working job ${queue} ${JSON.stringify(job)}`);
  });
  worker.on('reEnqueue', (queue, job, plugin) => {
    console.log(`reEnqueue job (${plugin}) ${queue} ${JSON.stringify(job)}`);
  });
  worker.on('success', (queue, job, result, duration) => {
    console.log(
        `job success ${queue} ${JSON.stringify(job)} >> ${String(result)} (${duration}ms)`
    );
  });
  worker.on('failure', (queue, job, failure, duration) => {
    console.log(
          `job failure ${queue} ${JSON.stringify(
            job
            )} >> ${String(failure)} (${duration}ms)`
    );
  });
  worker.on('error', (error, queue, job) => {
    console.log(`error ${queue} ${JSON.stringify(job)}  >> ${error.message}`);
  });
  worker.on('pause', () => {
    console.log('worker paused');
  });
}

export const handleSchedulerEvents = (scheduler: Scheduler): void => {
  scheduler.on('start', () => {
    console.log('scheduler started');
  });
  scheduler.on('end', () => {
    console.log('scheduler ended');
  });
  scheduler.on('poll', () => {
    console.log('scheduler polling');
  });
  scheduler.on('leader', () => {
    console.log('scheduler became leader');
  });
  scheduler.on('error', (error) => {
    console.log(`scheduler error >> ${error.message}`);
  });
  scheduler.on('cleanStuckWorker', (workerName, errorPayload, delta) => {
    console.log(
      `failing ${workerName} (stuck for ${delta}s) and failing job ${String(errorPayload)}`
    );
  });
  scheduler.on('workingTimestamp', (timestamp) => {
    console.log(`scheduler working timestamp ${timestamp}`);
  });
  scheduler.on('transferredJob', (timestamp, job) => {
    console.log(`scheduler enquing job ${timestamp} >> ${JSON.stringify(job)}`);
  });
}
// //////////////////////
// CONNECT TO A QUEUE //
// //////////////////////

export const handleQueueEvents = (queue: Queue): void => {
  queue.on('error', function (error: Error) {
    console.log(error.message);
  });
}
