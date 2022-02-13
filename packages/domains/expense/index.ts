import { ExpenseController } from "./ExpenseController";
import { ExpenseFormatter } from "./ExpenseFormatter";
import { ExpenseRouter } from './routes/ExpenseRouter';
import { IExpenseRepository, IExpenseRouter } from "./types";

export function createRouter(repository: IExpenseRepository, version: number = 1): IExpenseRouter {
    const formatter = new ExpenseFormatter();
    return new ExpenseRouter(new ExpenseController(formatter, repository), formatter, version);
}
