import { ObjectSchema } from 'joi';
import { LoginSchema, MatchSchema, SchemaValidator } from '../controllers/schemas';
import { LoginRequest, UpdateMatchResultRequest } from '../@types/types';
import { IMatchModel } from '../@types/interfaces';

class SchemaFactory {
  public static loginSchema(): ObjectSchema<LoginRequest> {
    return new LoginSchema().schema();
  }

  public static validate<T>(schema: ObjectSchema<T>, body: T): SchemaValidator<T> {
    return new SchemaValidator<T>(schema, body);
  }

  public static matchSchema(): ObjectSchema<IMatchModel> {
    return new MatchSchema().schema();
  }

  public static matchResultSchema(): ObjectSchema<UpdateMatchResultRequest> {
    return new MatchSchema().matchResultSchema();
  }
}

export default SchemaFactory;
