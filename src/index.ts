import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { opsBasePath, opsMiddleware } from './middlewares/ops';
import {
  getStaticPath,
  getVirtualRoot,
  serveStaticFiles
} from './staticConfig';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './api/schema';
import { context } from './api/context';

// initialize configuration
dotenv.config();

const port: string = (process.env.SERVER_PORT != null) ? process.env.SERVER_PORT : '8080';
const app = express();

app.use(opsBasePath, opsMiddleware);

if (serveStaticFiles()) {
  app.use(getVirtualRoot(), express.static(getStaticPath()));
}

// define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
  res.send(`Hello world from ${req.hostname}`);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use('/graphql', graphqlHTTP({
  schema,
  context,
  graphiql: true
}))

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
