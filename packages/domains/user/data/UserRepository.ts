import { IRepositoryDriver } from '@nc/utils/types';
import { IUserRepository } from '../types';

export class UserRepository implements IUserRepository {
  private driver: IRepositoryDriver;

  constructor(driver: IRepositoryDriver) {
    this.driver = driver;
  }

  readUser(userId) {
    return this.driver.query('SELECT * FROM users WHERE id = $1', [userId])
      .then((response) => response.rows?.[0]);
  }
}
