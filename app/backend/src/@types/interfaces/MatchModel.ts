import { Model } from 'sequelize/types';

interface IMatchModel extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchModelResponse extends IMatchModel {
  homeClub: {
    clubName: string;
  };
  awayClub: {
    clubName: string;
  };
}

export default IMatchModel;
