import { Op } from 'sequelize';
import MatchModel from '../database/models/MatchModel';
import ClubModel from '../database/models/ClubModel';
import {
  IMatchModel,
  IMatchModelRequest,
  IMatchModelResponse,
  IService,
} from '../@types/interfaces';
import { ModelStatic } from '../@types/types';
import CustomError from '../errors/CustomError';
import StatusCode from '../@types/enums';

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

  public async create(newMatch: IMatchModelRequest): Promise<IMatchModel> {
    if (newMatch.homeTeam === newMatch.awayTeam) {
      throw new CustomError('homeTeam and awayTeam must be diferents', StatusCode.BAD_REQUEST);
    }

    const clubs = await ClubModel.findAll({
      where: { id: { [Op.in]: [newMatch.homeTeam, newMatch.awayTeam] } },
    });

    if (clubs.length !== 2) throw new CustomError('Club not found', StatusCode.NOT_FOUND);

    if (newMatch.inProgress === false) {
      throw new CustomError('inProgress must be true', StatusCode.BAD_REQUEST);
    }

    const createdMatch = await this.model.create(newMatch);

    return createdMatch;
  }
}

export default MatchService;
