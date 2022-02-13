import { ApiError } from '@nc/utils/errors';
import { Request, Response, NextFunction, Router } from 'express';
import { IExpenseController, IExpenseFormatter, IExpenseRouter } from '../types';
import { to } from '@nc/utils/async';


export class ExpenseRouter implements IExpenseRouter {
  private router = Router();
  private controller: IExpenseController;
  private formatter: IExpenseFormatter;

  getRouter() {
    return this.router;
  }

  private getBoolean(value) {
    switch(value){
         case true:
         case "true":
         case 1:
         case "1":
         case "on":
         case "yes":
             return true;
         default: 
             return false;
     }
  }

  private async handlePaginatedGetUserExpenses(req, res, next) {
    console.log(req.params);
    console.log(req.query);

    let queryParameters = {
      userId: req.params.userId,
      pageNumber: parseInt(req.params.pageNumber) || 1,
      pageSize: parseInt(req.query.pageSize) || 50,
      orderByIndex: parseInt(req.query.order) || 2, 
      orderByAscending: this.getBoolean(req.query.asc),
      filter: req.query.filter || ''
    };
    
    const [expenseError, expensesDetails] = await to(this.controller.getUserExpenses(
      queryParameters.userId, 
      queryParameters.pageNumber, 
      queryParameters.pageSize, 
      queryParameters.orderByIndex, 
      queryParameters.orderByAscending, 
      queryParameters.filter
    ));
  
    if (expenseError) {
      return next(ApiError(expenseError, expenseError.status, `Could not get expenses for user ${req.params.userId}: ${expenseError}`, expenseError.title, req));
    }
  
    if (!expensesDetails) {
      return res.json({});
    }
  
    return res.json(this.formatter.secureTrim(expensesDetails));
  }

  private setupRouter(version: number) {
    let subrouter = Router();
    subrouter.get('/:userId/expenses/:pageNumber?', (req, res, next) => { return this.handlePaginatedGetUserExpenses(req, res, next); });

    this.router.use(`/v${version}`, subrouter);
  }

  constructor(controller: IExpenseController, formatter: IExpenseFormatter, version: number) {
    this.controller = controller;
    this.formatter = formatter;
    this.setupRouter(version);
  }
}
