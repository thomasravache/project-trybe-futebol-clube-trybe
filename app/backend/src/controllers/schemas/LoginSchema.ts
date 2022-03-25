import * as Joi from 'joi';
import { LoginRequest } from '../../@types/types';
import { ISchema } from '../../@types/interfaces';

class LoginSchema implements ISchema<LoginRequest> {
  private _schema: Joi.ObjectSchema<LoginRequest>;

  public schema(): Joi.ObjectSchema<LoginRequest> {
    const customMessage = 'All fields must be filled';

    this._schema = Joi.object({
      email: Joi.string().not().empty().required()
        .messages({
          'any.required': customMessage,
          'string.empty': customMessage,
        }),
      password: Joi.string().not().empty().required()
        .messages({
          'any.required': customMessage,
          'string.empty': customMessage,
        }),
    });

    return this._schema;
  }
}

export default LoginSchema;
