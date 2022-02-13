import { format } from './formatter';
import { readUser } from './data/db-user';
import { to } from '@nc/utils/async';
import { User } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getUserDetails(userId: string, readUserOverride?: Function): Promise<User> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  // This should try to run the overrider if it is set.
  const [dbError, rawUser] = await to(readUserOverride(userId) || readUser(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawUser) {
    throw NotFound(`Could not find user with id ${userId}`);
  }

  return format(rawUser);
}
