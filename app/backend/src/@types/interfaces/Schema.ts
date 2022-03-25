import { ObjectSchema } from 'joi';

interface ISchema<T> {
  schema(): ObjectSchema<T>;
}

export default ISchema;
