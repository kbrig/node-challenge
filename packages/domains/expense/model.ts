import { format } from './formatter';
import { readUserExpenses } from './data/db-expense';
import { to } from '@nc/utils/async';
import { Expense } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getUserExpenses(userId): Promise<Expense> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawExpense] = await to(readUserExpenses(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpense) {
    throw NotFound(`Could not find expenses for user id ${userId}`);
  }

  return format(rawExpense);
}
