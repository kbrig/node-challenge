import { ApiError } from '@nc/utils/errors';
import { getUserExpenses } from '../model';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/:userId/expenses', async (req, res, next) => {
  const [userError, userDetails] = await to(getUserExpenses(req.query?.userId));

  if (userError) {
    return next(ApiError(userError, userError.status, `Could not get user details: ${userError}`, userError.title, req));
  }

  if (!userDetails) {
    return res.json({});
  }

  return res.json(secureTrim(userDetails));
});
