import { Model } from 'sequelize/types';

interface IClubModel extends Model {
  id: number;
  clubName: string;
}

export default IClubModel;
