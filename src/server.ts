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
import { ResqueSetup } from './workers';
import expressPlayground from 'graphql-playground-middleware-express'
import cors from 'cors'
import { ironSession } from 'iron-session/express';
import morgan from 'morgan'
import { IronSession } from 'iron-session';
import * as Sentry from '@sentry/node';
import { initSentry } from './lib/sentry';

// initialize configuration
dotenv.config();
export const initialize = async (): Promise<{app: Express, resque?: ResqueSetup}> => {
  const app = express();
  initSentry(app)
  const mailTransporter = await setupNodemailer()
  // const resque = resqueSetup();
  const resque = undefined;
  const session = ironSession({
    cookieName: 'tod-session',
    password: String(process.env.IRON_SESSION_PASS),
    cookieOptions: {
    // the next line allows to use the session in non-https environements
      secure: process.env.NODE_ENV === 'production',
      domain: process.env.APP_HOST_URL
    }
  });

  app.use(opsBasePath, opsMiddleware);
  app.use(morgan('combined'))
  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
  app.use(cors({
    origin: process.env.APP_HOST_URL,
    credentials: true,
    optionsSuccessStatus: 200
  }))

  if (serveStaticFiles()) {
    app.use(getVirtualRoot(), express.static(getStaticPath()));
  }

  // define a route handler for the default home page
  app.get('/', (req: Request, res: Response) => {
    res.send(`Hello world from ${req.hostname}`);
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.use('/graphql', session, graphqlHTTP((request: Request & {session: IronSession & {user: {id: string}}}) => ({
    schema,
    context: createContext(request, mailTransporter, resque),
    graphiql: false,
    customFormatErrorFn: (error) => {
      return {
        message: error.message
      }
    }
  })))

  if (process.env.NODE_ENV !== 'production') {
    app.get('/playground', expressPlayground({
      endpoint: '/graphql'
    }))
  }

  app.use(Sentry.Handlers.errorHandler());
  return { app, resque };
}
