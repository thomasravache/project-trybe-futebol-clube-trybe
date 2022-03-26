import IClubModel from './ClubModel';
import IService from './Service';

interface IClubService extends IService {
  getAll(): Promise<IClubModel[]>;
  findOne(id: number): Promise<IClubModel>;
}

export default IClubService;
