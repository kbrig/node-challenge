import { query } from '@nc/utils/db';
import Logger from '@nc/utils/logging';

const logger = Logger("Expense-DB");

export function readUserExpenses(userId: string, page: number, pageSize: number, orderByIndex: number, orderByAscending: boolean, filter: string) {
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

  const p: any[] = [userId, orderByIndex];
  if (filter.length > 0) {
    
    p.push(`%${filter}%`);
  }

  return query(q, p).then((response) => { console.log(response); return response.rows; });
}
