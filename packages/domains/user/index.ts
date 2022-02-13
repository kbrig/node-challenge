import { UserFormatter } from './formatter';
import { UserController } from './model';
import { UserRouter } from './routes/v1-get-user';
import { IUserRepository, IUserRouter } from './types';

export function createRouter(repository: IUserRepository, version: number = 1): IUserRouter {
    const formatter = new UserFormatter();
    return new UserRouter(new UserController(repository, formatter), formatter, version);
}
