import Joi = require('joi');

class SchemaValidator<T> {
  private _schema: Joi.ObjectSchema<T>;

  private _body: T;

  constructor(schema: Joi.ObjectSchema<T>, body: T) {
    this._schema = schema;
    this._body = body;
    this.validate();
  }

  private validate(): void {
    const { error } = this._schema.validate(this._body);

    if (error) throw error;
  }
}

export default SchemaValidator;
