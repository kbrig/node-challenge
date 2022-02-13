import { IRepositoryDriver } from '@nc/utils/types';
import { IExpenseRepository } from '../types';

export class ExpenseRepository implements IExpenseRepository {
  private driver: IRepositoryDriver;

  constructor(driver: IRepositoryDriver) {
    this.driver = driver;
  }

  readUserExpenses(userId: string, page: number, pageSize: number, orderByIndex: number, orderByAscending: boolean, filter: string) {
    const p: (string | number | boolean)[] = [userId, orderByIndex];
    let q: string = `
SELECT * 
FROM expenses 
WHERE 
user_id = $1 
${filter.length > 0 ? 'AND merchant_name LIKE $3' : ''}
ORDER BY 
$2 ${orderByAscending ? 'ASC' : 'DESC'},
date_created DESC
LIMIT ${pageSize} 
OFFSET ${(page - 1) * pageSize}`;

    if (filter.length > 0) {
      p.push(`%${filter}%`);
    }
    return this.driver.query(q, p).then((response) => response.rows);
  }
}
