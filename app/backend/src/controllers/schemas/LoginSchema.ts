import * as Joi from 'joi';
import { LoginRequest } from '../../@types/types';
import { ISchema } from '../../@types/interfaces';

class LoginSchema implements ISchema<LoginRequest> {
  private _schema: Joi.ObjectSchema<LoginRequest>;

  public schema(): Joi.ObjectSchema<LoginRequest> {
    this._schema = Joi.object({
      email: Joi.not().empty().required()
        .messages({
          'any.required': 'All fields must be filled',
        }),
      password: Joi.not().empty().required()
        .messages({
          'any.required': 'All fields must be filled',
        }),
    });

    return this._schema;
  }
}

export default LoginSchema;
