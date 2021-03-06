import { Op } from 'sequelize';
import MatchModel from '../database/models/MatchModel';
import ClubModel from '../database/models/ClubModel';
import {
  IMatchModel,
  IMatchModelRequest,
  IMatchModelResponse,
  IService,
} from '../@types/interfaces';
import { ModelStatic, UpdateMatchResultRequest } from '../@types/types';
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
    await MatchService.createValidate(newMatch);

    const createdMatch = await this.model.create(newMatch);

    return createdMatch;
  }

  private static async createValidate(
    { homeTeam, awayTeam, inProgress }: IMatchModelRequest,
  ): Promise<void> {
    if (homeTeam === awayTeam) {
      throw new CustomError(
        'It is not possible to create a match with two equal teams',
        StatusCode.UNAUTHORIZED,
      );
    }

    const clubs = await ClubModel.findAll({
      where: { id: { [Op.in]: [homeTeam, awayTeam] } },
    });

    if (clubs.length !== 2) {
      throw new CustomError('There is no team with such id!', StatusCode.UNAUTHORIZED);
    }

    if (inProgress === false) {
      throw new CustomError('inProgress must be true', StatusCode.BAD_REQUEST);
    }
  }

  public async endGame(matchId: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id: matchId } });
  }

  public async updateMatchResult(
    matchId: number,
    { homeTeamGoals, awayTeamGoals }: UpdateMatchResultRequest,
  ): Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id: matchId } });
  }
}

export default MatchService;
