import { UserFormatter } from './UserFormatter';
import { UserController } from './UserController';
import { UserRouter } from './routes/UserRouter';
import { IUserRepository, IUserRouter } from './types';

export function createRouter(repository: IUserRepository, version: number = 1): IUserRouter {
    const formatter = new UserFormatter();
    return new UserRouter(new UserController(repository, formatter), formatter, version);
}
