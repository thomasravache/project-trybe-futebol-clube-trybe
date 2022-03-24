import { Model } from 'sequelize/types';

interface IUserModel extends Model {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
}

export default IUserModel;
