/* eslint-disable @typescript-eslint/no-unused-vars */
import { JsonWebTokenError } from 'jsonwebtoken';
import { NotAuthorizedError } from '../../errors/NotAuthorizedError';
import { InvalidParamError } from '../../errors/InvalidParamError';
import { TokenError } from '../../errors/TokenError';
import { QueryError } from '../../errors/QueryError';
import { statusCodes } from '../../utils/constants/status-codes';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  const message = error.message;
  let status = statusCodes.INTERNAL_SERVER_ERROR;

  if (error instanceof JsonWebTokenError ||
    error instanceof NotAuthorizedError) {
    status = statusCodes.FORBIDDEN;
  }

  if (error instanceof InvalidParamError) {
    status = statusCodes.BAD_REQUEST;
  }

  if (error instanceof TokenError) {
    status = statusCodes.NOT_FOUND;
  }

  if (error instanceof QueryError) {
    status = statusCodes.BAD_REQUEST;
  }

  console.log(error);
  res.status(status).json(message);
}