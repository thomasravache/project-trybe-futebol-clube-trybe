import ClubModel from '../database/models/ClubModel';
import { IClubModel, IService } from '../@types/interfaces';
import { ModelStatic } from '../@types/types';

class ClubService implements IService {
  public readonly model: ModelStatic<IClubModel>;

  constructor(model: ModelStatic<IClubModel> = ClubModel) {
    this.model = model;
  }

  public async getAll(): Promise<IClubModel[]> {
    const clubs = await this.model.findAll();

    return clubs;
  }
}

export default ClubService;
