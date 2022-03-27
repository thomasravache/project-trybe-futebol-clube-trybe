import { DataTypes, Model } from 'sequelize';
import { IMatchModel } from '../../@types/interfaces';
import db from '.';
import ClubModel from './ClubModel';

class MatchModel extends Model implements IMatchModel {
  public id!: number;

  public homeTeam!: number;

  public homeTeamGoals!: number;

  public awayTeam!: number;

  public awayTeamGoals!: number;

  public inProgress!: boolean;
}

MatchModel.init({
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
  },
  homeTeam: DataTypes.NUMBER,
  homeTeamGoals: DataTypes.NUMBER,
  awayTeam: DataTypes.NUMBER,
  awayTeamGoals: DataTypes.NUMBER,
  inProgress: DataTypes.BOOLEAN,
}, {
  underscored: true,
  timestamps: false,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
});

MatchModel.belongsTo(ClubModel, { foreignKey: 'homeTeam', as: 'homeClub' });
MatchModel.belongsTo(ClubModel, { foreignKey: 'awayTeam', as: 'awayClub' });

ClubModel.hasMany(MatchModel, { foreignKey: 'id', as: 'matchs' });

export default MatchModel;
