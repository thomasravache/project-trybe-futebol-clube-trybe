import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import { JoiStatusCodes } from '../@types/types';
import { IDomainError } from '../@types/interfaces';
import StatusCode from '../@types/enums';

class ErrorHandler {
  private static _joiStatusCodes: JoiStatusCodes;

  constructor() {
    ErrorHandler._joiStatusCodes = {
      'any.required': StatusCode.BAD_REQUEST,
    };
  }

  public static inputError(
    err: ValidationError,
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    if (err.isJoi) {
      const { details } = err;
      const { type, message } = details[0];

      const statusCode = this._joiStatusCodes[type] || 404;

      return res.status(statusCode).json({ error: message });
    }

    return next(err);
  }

  public static domainError(
    err: IDomainError,
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    if (err.domain) {
      return res.status(err.code).json({ error: err.message });
    }

    return next(err);
  }

  public static serverError(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Response {
    console.error(err);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Erro inesperado' });
  }
}

export default ErrorHandler;
