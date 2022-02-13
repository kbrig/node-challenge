import { Request, Response, NextFunction } from "express";
import { randomUUID } from 'crypto';

export default function context(req: Request, res: Response, next: NextFunction) {
  const requestId = req.headers['x-request-id'] || randomUUID();

  //TODO: This is a hack, is there a better way?
  (req as any).id = requestId;
  res.setHeader('x-request-id', requestId);

  next();
}
