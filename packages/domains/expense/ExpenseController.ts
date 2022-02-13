import { Expense, IExpenseFormatter, IExpenseRepository } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { to } from '@nc/utils/async';

export class ExpenseController {
  private formatter: IExpenseFormatter;
  private repository: IExpenseRepository;

  constructor(repository: IExpenseRepository, formatter: IExpenseFormatter) {
    this.repository = repository;
    this.formatter = formatter;
  }

  setRepository(newRepository: IExpenseRepository) {
    this.repository = newRepository;
  }
  
  async getUserExpenses(userId: string, pageNumber: number, pageSize: number, orderByIndex: number, orderByAscending: boolean, filter: string): Promise<Expense[]> {
    if (!userId) {
      throw BadRequest('userId property is missing.');
    }
  
    console.log(this.repository);
    const [dbError, rawExpenses] = await to(this.repository.readUserExpenses(userId, pageNumber, pageSize, orderByIndex, orderByAscending, filter));
  
    if (dbError) {
      throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
    }
  
    if (!rawExpenses) {
      throw NotFound(`Could not find expenses for user id ${userId}`);
    }
  
    return this.formatter.formatAll(rawExpenses);
  }
}
