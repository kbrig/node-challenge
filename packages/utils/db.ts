import { Client } from 'pg';
import config from 'config';

let db;

export function connect() {
  db = new Client(config.db);
  return db.connect();
}

export async function query(queryString: string, parameters?: any) {
  if (!db) await connect();

  console.log(`Querying DB with:\n${queryString}\n${parameters}`);

  return db.query(queryString, parameters);
}
