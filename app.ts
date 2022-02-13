import config from 'config';
import context from './middleware/context';
import express, { Application, Request, Response, NextFunction } from 'express';
import gracefulShutdown from '@nc/utils/graceful-shutdown';
import Logger from '@nc/utils/logging';

import { createServer } from './server';
import { ExpenseRepository } from '@nc/domain-expense/data/ExpenseRepository';

const logger = Logger('server');
const server = createServer(new ExpenseRepository());

gracefulShutdown(server);

server.listen(config.port, () => {
  logger.log(`Server started on port ${config.port}`);
});

export default server;
