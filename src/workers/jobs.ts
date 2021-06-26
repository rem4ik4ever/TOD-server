import { Plugins } from 'node-resque'

export const jobs = {
  add: {
    plugins: [Plugins.JobLock],
    pluginOptions: {
      JobLock: { reEnqueue: true }
    },
    perform: async (a: number, b: number) => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      const answer = a + b;
      return answer;
    }
  },
  subtract: {
    perform: (a: number, b: number) => {
      const answer = a - b;
      return answer;
    }
  },
  failOperation: {
    plugins: [Plugins.JobLock, Plugins.Retry],
    pluginOptions: {
      JobLock: { reEnqueue: true },
      Retry: { retryLimit: 3 }
    },
    perform: (a: number) => {
      if (a > 0) {
        throw new Error('This is intentional')
      }
      return a
    }
  }
};
