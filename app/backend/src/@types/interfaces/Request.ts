import { Request } from 'express';
import { IUserResponse } from './UserModel';

interface IRequest extends Request {
  user?: IUserResponse;
}

export default IRequest;
