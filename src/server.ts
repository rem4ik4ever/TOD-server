import express, { Response, Express, Request } from 'express';
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
import { ResqueSetup, resqueSetup } from './workers';
import expressPlayground from 'graphql-playground-middleware-express'
import cors from 'cors'
import { ironSession, Session } from 'next-iron-session';

// initialize configuration
dotenv.config();

export const initialize = async (): Promise<{app: Express, resque: ResqueSetup}> => {
  const app = express();
  const mailTransporter = await setupNodemailer()
  const resque = resqueSetup();
  console.log({
    pass: process.env.IRON_SESSION_PASS
  })
  const session = ironSession({
    cookieName: 'tod-session',
    password: String(process.env.IRON_SESSION_PASS),
    cookieOptions: {
    // the next line allows to use the session in non-https environements
      secure: process.env.NODE_ENV === 'production'
    }
  });

  app.use(opsBasePath, opsMiddleware);
  app.use(cors())

  if (serveStaticFiles()) {
    app.use(getVirtualRoot(), express.static(getStaticPath()));
  }

  // define a route handler for the default home page
  app.get('/', (req: Request, res: Response) => {
    res.send(`Hello world from ${req.hostname}`);
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.use('/graphql', session, graphqlHTTP((request: Request & {session: Session}) => ({
    schema,
    context: createContext(request, mailTransporter, resque),
    graphiql: false
  })))

  app.get('/playground', expressPlayground({
    endpoint: '/graphql'
  }))

  return { app, resque };
}
