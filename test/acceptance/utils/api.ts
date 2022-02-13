import { ExpenseRepository } from '@nc/domain-expense/data/ExpenseRepository';
import { UserRepository } from '@nc/domain-user/data/UserRepository';
import { agent } from 'supertest';
import { createServer } from '../../../server';
import { MockDBDriver } from './MockDBDriver';

export const userMockDriver = new MockDBDriver();
export const expenseMockDriver = new MockDBDriver();

//TODO: Mock drivers.
export const Api = agent(createServer(new UserRepository(userMockDriver), new ExpenseRepository(expenseMockDriver)));
