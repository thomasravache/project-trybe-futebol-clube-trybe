import { Model } from 'sequelize/types';
import IMatchModel from './MatchModel';

interface IClubModel extends Model {
  id: number;
  clubName: string;
}

export interface IClubModelAssociations extends IClubModel {
  homeMatchs: IMatchModel[];
  awayMatchs: IMatchModel[];
}

export default IClubModel;
