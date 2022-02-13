import config from 'config';
import gracefulShutdown from '@nc/utils/graceful-shutdown';
import Logger from '@nc/utils/logging';

import { createServer } from './server';
import { ExpenseRepository } from '@nc/domain-expense/data/ExpenseRepository';
import { UserRepository } from '@nc/domain-user/data/db-user'

const logger = Logger('server');
const server = createServer(new UserRepository(), new ExpenseRepository());

gracefulShutdown(server);

server.listen(config.port, () => {
  logger.log(`Server started on port ${config.port}`);
});

export default server;
