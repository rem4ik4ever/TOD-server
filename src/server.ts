import express, { Request, Response, Express } from 'express';
import * as dotenv from 'dotenv';
import { opsBasePath, opsMiddleware } from './middlewares/ops';
import {
  getStaticPath,
  getVirtualRoot,
  serveStaticFiles
} from './staticConfig';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './api/schema';
import { createContext } from './api/context';
import { setupNodemailer } from './config/nodemailerConfig';

// initialize configuration
dotenv.config();

export const initialize = async (): Promise<Express> => {
  const app = express();
  const mailTransporter = await setupNodemailer()

  app.use(opsBasePath, opsMiddleware);

  if (serveStaticFiles()) {
    app.use(getVirtualRoot(), express.static(getStaticPath()));
  }

  // define a route handler for the default home page
  app.get('/', (req: Request, res: Response) => {
    res.send(`Hello world from ${req.hostname}`);
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.use('/graphql', graphqlHTTP((request) => ({
    schema,
    context: createContext(request, mailTransporter),
    graphiql: true
  })))

  return app;
}
