import { ExpenseRepository } from '@nc/domain-expense/data/ExpenseRepository';
import { agent } from 'supertest';
import { createServer } from '../../../server';

//TODO: Mock repository up.
export const Api = agent(createServer(new ExpenseRepository()));
