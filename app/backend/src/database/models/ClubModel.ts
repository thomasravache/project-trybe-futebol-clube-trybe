import { DataTypes, Model } from 'sequelize';
import { IClubModel } from '../../@types/interfaces';
import db from '.';

class ClubModel extends Model implements IClubModel {
  public id!: number;

  public clubName: string;
}

ClubModel.init({
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
  },
  clubName: DataTypes.STRING,
}, {
  underscored: true,
  timestamps: false,
  sequelize: db,
  modelName: 'Club',
  tableName: 'clubs',
});

export default ClubModel;
