import { ExpenseRepository } from '@nc/domain-expense/data/ExpenseRepository';
import { UserRepository } from '@nc/domain-user/data/UserRepository';
import { agent } from 'supertest';
import { createServer } from '../../../server';

//TODO: Mock repository up.
export const Api = agent(createServer(new UserRepository(), new ExpenseRepository()));
