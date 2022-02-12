import { formatAll } from './formatter';
import { readUserExpenses } from './data/db-expense';
import { to } from '@nc/utils/async';
import { Expense } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getUserExpenses(userId: string, pageNumber: number, pageSize: number, orderByIndex: number, orderByAscending: boolean, filter: string): Promise<Expense[]> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawExpenses] = await to(readUserExpenses(userId, pageNumber, pageSize, orderByIndex, orderByAscending, filter));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpenses) {
    throw NotFound(`Could not find expenses for user id ${userId}`);
  }

  return formatAll(rawExpenses);
}
