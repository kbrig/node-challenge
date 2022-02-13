import { IUserController, IUserFormatter, IUserRepository, User } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { to } from '@nc/utils/async';


export class UserController implements IUserController {
  private repository: IUserRepository;
  private formatter: IUserFormatter;

  constructor(repository: IUserRepository, formatter: IUserFormatter) {
    this.repository = repository;
    this.formatter = formatter;
  }

  async getUserDetails(userId: string): Promise<User> {
    if (!userId) {
      throw BadRequest('userId property is missing.');
    }
    
    const [dbError, rawUser] = await to(this.repository.readUser(userId));

    if (dbError) {
      throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
    }

    if (!rawUser) {
      throw NotFound(`Could not find user with id ${userId}`);
    }

    return this.formatter.format(rawUser);
  }
}
