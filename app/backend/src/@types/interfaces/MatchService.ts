import IMatchModel, { IMatchModelResponse } from './MatchModel';
import { UpdateMatchResultRequest } from '../types';
import IService from './Service';

interface IMatchService extends IService {
  getAll(inProgressParam: unknown): Promise<IMatchModelResponse[]>;
  create(newMatch: IMatchModel): Promise<IMatchModel>;
  endGame(matchId: number): Promise<void>;
  updateMatchResult(
    matchId: number,
    { homeTeamGoals, awayTeamGoals }: UpdateMatchResultRequest,
  ): Promise<void>;
}

export default IMatchService;
