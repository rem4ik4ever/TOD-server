import { Plugins } from 'node-resque'
import { prisma } from 'src/api/db';
import { SendConfirmUserEmail, sendConfirmUserEmail } from 'src/api/domains/authentication/sendConfirmUserEmail';
import { populateTable } from 'src/api/domains/populateTable';
import { columnResource, emailConfirmationResource, tableResource } from 'src/api/resources';
import { setupNodemailer } from 'src/config/nodemailerConfig';

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
  },
  sendConfirmationEmail: {
    plugins: [Plugins.Retry],
    pluginOptions: {
      Retru: { retryLimit: 2 }
    },
    perform: async (userId: string): Promise<Boolean> => {
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (user === null) return false;

      const params: SendConfirmUserEmail = {
        emailConfirmationResource: emailConfirmationResource({ client: prisma }),
        user: user,
        transporter: await setupNodemailer()
      }
      const result = await sendConfirmUserEmail(params)
      if (!result) throw new Error('send_confirmation_email_failed')
      return true;
    }
  },
  populateTable: {
    perform: async (tableId: number): Promise<Boolean> => {
      try {
        await populateTable({
          tableResource: tableResource({ client: prisma }),
          columnResource: columnResource({ client: prisma }),
          tableId
        })
      } catch (error) {
        console.log(error);
        return false;
      }
      return true;
    }
  }
};
