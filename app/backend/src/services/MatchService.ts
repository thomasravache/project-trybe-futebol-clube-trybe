import { Op } from 'sequelize';
import MatchModel from '../database/models/MatchModel';
import ClubModel from '../database/models/ClubModel';
import { IMatchModel, IMatchModelResponse, IService } from '../@types/interfaces';
import { ModelStatic } from '../@types/types';

class MatchService implements IService {
  public readonly model: ModelStatic<IMatchModel>;

  constructor(model: ModelStatic<IMatchModel> = MatchModel) {
    this.model = model;
  }

  public async getAll(inProgressParam: string | undefined): Promise<IMatchModelResponse[]> {
    const matchs = await this.model.findAll({
      where: {
        inProgress: !inProgressParam ? { [Op.or]: [true, false] } : inProgressParam === 'true',
      },
      include: [
        { model: ClubModel, as: 'homeClub', attributes: { exclude: ['id'] } },
        { model: ClubModel, as: 'awayClub', attributes: { exclude: ['id'] } },
      ],
    });

    return matchs as IMatchModelResponse[];
  }
}

export default MatchService;
