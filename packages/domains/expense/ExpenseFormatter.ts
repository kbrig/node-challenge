import { BaseFormatter } from '../BaseFormatter';
import { Expense } from './types';


export class ExpenseFormatter extends BaseFormatter {
  private publicFields = ['merchant_name', 'amount_in_cents', 'currency', 'date_created', 'status'];
  
  secureTrim(expenses: Expense[]) : string {
    return JSON.stringify(expenses, this.publicFields);
  }
  
  format(rawExpense): Expense {
    return {
      id: rawExpense.id,
      merchant_name: this.capitalize(rawExpense.merchant_name),
      amount_in_cents: rawExpense.amount_in_cents,
      currency: rawExpense.currency,
      user_id: rawExpense.user_id,
      date_created: rawExpense.date_created,
      status: rawExpense.status
    };
  }
  
  formatAll(rawExpenses): Expense[] {
    let result: Expense[] = [];
  
    rawExpenses.forEach(rawExpense => {
      result.push(this.format({
        id: rawExpense.id,
        merchant_name: this.capitalize(rawExpense.merchant_name),
        amount_in_cents: rawExpense.amount_in_cents,
        currency: rawExpense.currency,
        user_id: rawExpense.user_id,
        date_created: rawExpense.date_created,
        status: rawExpense.status
      }));
    });
    
    return result;
  }
}
