import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';

export const opsBasePath = '/ops';

const healthCheck = (): string => 'pong';
const printEnv = (): string => JSON.stringify(process.env, undefined, 2);
const printHeaders = (req: Request): string =>
  JSON.stringify(req.headers, undefined, 2);

interface IOpsRoutes {
  '/ping': Function
  '/env': Function
  '/headers': Function
}
const routes: IOpsRoutes = {
  '/ping': healthCheck,
  '/env': printEnv,
  '/headers': printHeaders
};

export const opsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { url } = req;
  const fn: (Function | undefined) = get(routes, url, undefined);
  if (fn instanceof Function) {
    res.status(200);
    res.header('Content-Type', 'text/plain');
    res.send(fn(req));
  } else {
    // not ops middleware route
    next();
  }
};
