import { Model } from 'sequelize/types';

export interface IMatchModelRequest {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

interface IMatchModel extends IMatchModelRequest, Model {
  id: number;
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
