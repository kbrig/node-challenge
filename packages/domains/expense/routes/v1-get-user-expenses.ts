import { ApiError } from '@nc/utils/errors';
import { getUserExpenses } from '../model';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';
import { Expense } from '../types'

export const router = Router();

router.get('/:userId/expenses', async (req, res, next) => {
  const [expenseError, expensesDetails] = await to(getUserExpenses(req.params.userId));

  if (expenseError) {
    return next(ApiError(expenseError, expenseError.status, `Could not get expenses for user ${req.params.userId}: ${expenseError}`, expenseError.title, req));
  }

  if (!expensesDetails) {
    return res.json({});
  }

  return res.json(secureTrim(expensesDetails));
});
