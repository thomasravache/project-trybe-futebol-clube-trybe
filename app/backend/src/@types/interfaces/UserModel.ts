import { Model } from 'sequelize/types';

export interface IUserResponse {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface IUserModel extends IUserResponse, Model {
  password: string;
}

export default IUserModel;
