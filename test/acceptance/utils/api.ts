import { agent } from 'supertest';
import { createServer } from '../../../server';

export const Api = agent(createServer());
