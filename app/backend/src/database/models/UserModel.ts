import { DataTypes, Model } from 'sequelize';
import { IUserModel } from '../../@types/interfaces';
import db from '.';

class UserModel extends Model implements IUserModel {
  public id!: number;

  public username!: string;

  public role!: string;

  public email!: string;

  public password!: string;
}

UserModel.init({
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'User',
  tableName: 'users',
});

export default UserModel;
