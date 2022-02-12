import { ApiError } from '@nc/utils/errors';
import { getUserExpenses } from '../model';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';

export const router = Router();

function getBoolean(value){
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

const handleQueryParameters = (req) => {
  return {
    userId: req.params.userId,
    pageNumber: parseInt(req.params.pageNumber) || 1,
    pageSize: parseInt(req.query.pageSize) || 50,
    orderByIndex: parseInt(req.query.order) || 6, 
    orderByAscending: getBoolean(req.query.asc),
    filter: req.query.filter
  };
};


router.get('/:userId/expenses/:pageNumber?', async (req, res, next) => {

  let queryParameters = handleQueryParameters(req.query);

  const [expenseError, expensesDetails] = await to(getUserExpenses(req.params.userId, queryParameters.pageNumber, queryParameters.pageSize, queryParameters.orderByIndex, queryParameters.orderByAscending, queryParameters.filter));

  if (expenseError) {
    return next(ApiError(expenseError, expenseError.status, `Could not get expenses for user ${req.params.userId}: ${expenseError}`, expenseError.title, req));
  }

  if (!expensesDetails) {
    return res.json({});
  }

  return res.json(secureTrim(expensesDetails));
});
