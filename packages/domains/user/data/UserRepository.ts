import { query } from '@nc/utils/db';
import { IUserRepository } from '../types';

export class UserRepository implements IUserRepository {
  readUser(userId) {
    return query('SELECT * FROM users WHERE id = $1', [userId])
      .then((response) => response.rows?.[0]);
  }
}
