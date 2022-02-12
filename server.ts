import config from 'config';
import context from './middleware/context';
import express, { Application, Request, Response, NextFunction } from 'express';
import gracefulShutdown from '@nc/utils/graceful-shutdown';
import helmet from 'helmet';
import Logger from '@nc/utils/logging';
import security from './middleware/security';
import { router as userRoutes } from '@nc/domain-user';
import { router as expenseRoutes } from '@nc/domain-expense';
import { createServer as createHTTPServer, Server } from 'http';
import { createServer as createHTTPSServer, Server as SecureServer } from 'https';

const logger = Logger('server');
const app: Application = express();
const server: Server | SecureServer = (config.https.enabled === true) ? createHTTPSServer(config.https, app as any) : createHTTPServer(app as any);
var ready: boolean = false;

gracefulShutdown(server);

app.use(helmet());
app.get('/readycheck', function readinessEndpoint(req: Request, res: Response) {
  const status: number = ready ? 200 : 503;
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
  res.status(500).json(err);
});

server.listen(config.port, () => {
  ready = true;
  logger.log(`Server started on port ${config.port}`);
});

export default server;
