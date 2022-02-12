import { format } from './formatter';
import { readUserExpenses } from './data/db-expense';
import { to } from '@nc/utils/async';
import { Expense } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getUserExpenses(userId): Promise<Expense[]> {
  console.log(`Getting expenses for user ${userId}`);

  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawExpenses] = await to(readUserExpenses(userId));

  console.log('raw data:');
  console.log(JSON.stringify(rawExpenses));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpenses) {
    throw NotFound(`Could not find expenses for user id ${userId}`);
  }

  const result: Expense[] = [];

  rawExpenses.forEach(element => {
    result.push(format(element));
  });

  return result;
}
