import ClubModel from '../database/models/ClubModel';
import { IClubModel, IService } from '../@types/interfaces';
import { ModelStatic } from '../@types/types';
import CustomError from '../errors/CustomError';
import StatusCode from '../@types/enums';

class ClubService implements IService {
  public readonly model: ModelStatic<IClubModel>;

  constructor(model: ModelStatic<IClubModel> = ClubModel) {
    this.model = model;
  }

  public async getAll(): Promise<IClubModel[]> {
    const clubs = await this.model.findAll();

    return clubs;
  }

  public async findOne(id: number): Promise<IClubModel> {
    const club = await this.model.findOne({ where: { id } });

    if (!club) throw new CustomError('Club not found', StatusCode.NOT_FOUND);

    return club;
  }
}

export default ClubService;
