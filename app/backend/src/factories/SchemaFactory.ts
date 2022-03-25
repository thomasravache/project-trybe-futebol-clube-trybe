import { ObjectSchema } from 'joi';
import { LoginSchema, SchemaValidator } from '../controllers/schemas';
import { LoginRequest } from '../@types/types';

class SchemaFactory {
  public static loginSchema(): ObjectSchema<LoginRequest> {
    return new LoginSchema().schema();
  }

  public static validate<T>(schema: ObjectSchema<T>, body: T): SchemaValidator<T> {
    return new SchemaValidator<T>(schema, body);
  }
}

export default SchemaFactory;
