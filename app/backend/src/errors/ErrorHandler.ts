import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import { JoiStatusCodes } from '../@types/types';
import { IDomainError } from '../@types/interfaces';
import StatusCode from '../@types/enums';

const joiStatusCodes: JoiStatusCodes = {
  'any.required': StatusCode.UNAUTHORIZED,
  'string.empty': StatusCode.UNAUTHORIZED,
};

class ErrorHandler {
  public static inputError(
    err: ValidationError,
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    if (err.isJoi) {
      const { details } = err;
      const { type, message } = details[0];
      console.log(type);
      const statusCode = joiStatusCodes[type] || 404;

      return res.status(statusCode).json({ message });
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
      return res.status(err.code).json({ message: err.message });
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
