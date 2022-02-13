import { ExpenseRepository } from '@nc/domain-expense/data/ExpenseRepository';
import { UserRepository } from '@nc/domain-user/data/UserRepository';
import { PostGresSQLDriver } from '@nc/utils/db';
import { agent } from 'supertest';
import { createServer } from '../../../server';

//TODO: Mock drivers.
export const Api = agent(
    createServer(
        new UserRepository(new PostGresSQLDriver()),
        new ExpenseRepository(new PostGresSQLDriver())
    )
);
