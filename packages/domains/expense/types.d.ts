import { IBaseFormatter } from "../BaseFormatter";

export interface Expense {
    id: string
    merchant_name: string
    amount_in_cents: number
    currency: string
    user_id: string
    date_created: Date
    status: string
}

export interface IExpenseRepository {
    readUserExpenses(userId: string, page: number, pageSize: number, orderByIndex: number, orderByAscending: boolean, filter: string);
}

export interface IExpenseController {
    setRepository(newRepository: IExpenseRepository);
    getUserExpenses(userId: string, pageNumber: number, pageSize: number, orderByIndex: number, orderByAscending: boolean, filter: string): Promise<Expense[]>;
}

export interface IExpenseFormatter extends IBaseFormatter {
    capitalize(word: string): string;
    secureTrim(expenses: Expense[]): string;
    format(rawExpense): Expense;
    formatAll(rawExpenses): Expense[];
}

export interface IExpenseRouter {
    getRouter();
 }