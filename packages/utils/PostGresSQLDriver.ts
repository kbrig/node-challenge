import { Client } from 'pg';
import config from 'config';
import { IRepositoryDriver } from './types';


export class PostGresSQLDriver implements IRepositoryDriver {
  private db;
  connect() {
    this.db = new Client(config.db);
    return this.db.connect();
  }

  async query(queryString: string, parameters?: any): Promise<any> {
    if (!this.db) await this.connect();

    return this.db.query(queryString, parameters);
  }

}