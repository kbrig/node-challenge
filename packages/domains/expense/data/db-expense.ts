import { query } from '@nc/utils/db';
import Logger from '@nc/utils/logging';

const logger = Logger("Expense-DB");

export function readUserExpenses(userId: string, page: number, pageSize: number, orderByIndex: number, orderByAscending: boolean, filter: string) {
  let q: string;
  const p: any[] = [];

  if (filter.length > 0) {
    q = `
SELECT * 
FROM expenses 
WHERE 
  user_id = $1 
  AND merchant_name LIKE $2 
ORDER BY 
  $3 ${orderByAscending ? 'ASC' : 'DESC'} 
LIMIT ${pageSize} 
OFFSET ${(page - 1) * pageSize}
`;
    p.push(userId, `%${filter}%`, orderByIndex);
  } else {
    q = `
SELECT * 
FROM expenses 
WHERE 
  user_id = $1 
ORDER BY $2 ${orderByAscending ? 'ASC' : 'DESC'} 
LIMIT ${pageSize} 
OFFSET ${(page - 1) * pageSize}
`;
    p.push(userId, orderByIndex);
  }

  return query(q, p).then((response) => { console.log(response); return response.rows; });
}
