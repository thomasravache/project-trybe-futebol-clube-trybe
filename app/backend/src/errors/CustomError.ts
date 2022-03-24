import { IDomainError } from '../@types/interfaces';
import StatusCode from '../@types/enums';

class CustomError extends Error implements IDomainError {
  private _domain: boolean;

  private _statusCode: StatusCode;

  constructor(message: string, code: StatusCode) {
    super(message);
    this._domain = true;
    this._statusCode = code;
  }

  public get domain(): boolean {
    return this._domain;
  }

  public get code(): StatusCode {
    return this._statusCode;
  }
}

export default CustomError;
