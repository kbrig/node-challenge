import config from 'config';
import gracefulShutdown from '@nc/utils/graceful-shutdown';
import Logger from '@nc/utils/logging';

import { createServer } from './server';
import { ExpenseRepository } from '@nc/domain-expense/data/ExpenseRepository';
import { UserRepository } from '@nc/domain-user/data/UserRepository'
import { PostGresSQLDriver } from '@nc/utils/db';

const logger = Logger('server');
const server = createServer(new UserRepository(new PostGresSQLDriver()), new ExpenseRepository(new PostGresSQLDriver()));

gracefulShutdown(server);

server.listen(config.port, () => {
  logger.log(`Server started on port ${config.port}`);
});

export default server;
