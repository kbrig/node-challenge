import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { IUserController, IUserFormatter, IUserRouter } from '../types';

export class UserRouter implements IUserRouter {
  private router = Router();
  private controller: IUserController;
  private formatter: IUserFormatter;

  getRouter() {
    return this.router;
  }

  private async handleGet(req, res, next) {
    const [userError, userDetails] = await to(this.controller.getUserDetails(req.params.userId));
    // If nothing is found, go on to the next if{}
    // If anything else errored, call next() handler with error.
    if (userError && userError.status != 404) {
      return next(new ApiError(userError, userError.status, `Error while getting user details: ${userError}`, userError.title, req));
    }
    if (!userDetails) {
      return res.status(404).json({});
    }
    return res.json(this.formatter.secureTrim(userDetails));
  }

  private setupRouter(version: number) {
    let subrouter = Router();
    subrouter.get('/:userId', async (req, res, next) => { return await this.handleGet(req, res, next); });

    this.router.use(`/v${version}`, subrouter);
  }

  constructor(controller: IUserController, formatter: IUserFormatter, version: number = 1) {
    this.controller = controller;
    this.formatter = formatter;
    this.setupRouter(version);
  }
}
