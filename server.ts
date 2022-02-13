import context from './middleware/context';
import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import security from './middleware/security';
import { router as userRoutes } from '@nc/domain-user';
import { router as expenseRoutes } from '@nc/domain-expense';
import { createServer as createHTTPServer, Server } from 'http';
import { createServer as createHTTPSServer, Server as SecureServer } from 'https';
import config from 'config';


const app: Application = express();
export const server: Server | SecureServer = (config.https.enabled === true) ? createHTTPSServer(config.https, app as any) : createHTTPServer(app as any);

export function createServer() : Server | SecureServer {
  app.use(helmet());
  app.get('/readycheck', function readinessEndpoint(req: Request, res: Response) {
    const status: number = server.listening ? 200 : 503;
    res.status(status).send(status === 200 ? 'OK' : 'NOT OK');
  });
  
  app.get('/healthcheck', function healthcheckEndpoint(req: Request, res: Response) {
    res.status(200).send('OK');
  });

  app.use(context);
  app.use(security);
  
  app.use('/user', userRoutes);
  app.use('/user', expenseRoutes);

  app.use(function(err, req: Request, res: Response, next: NextFunction) {
    console.log('=== Express error triggered! ===');
    res.status(500).json(err);
  });
  return server;
}
