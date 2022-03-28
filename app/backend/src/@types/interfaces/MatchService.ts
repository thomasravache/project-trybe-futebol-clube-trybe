import IMatchModel, { IMatchModelResponse } from './MatchModel';
import IService from './Service';

interface IMatchService extends IService {
  getAll(inProgressParam: unknown): Promise<IMatchModelResponse[]>;
  create(newMatch: IMatchModel): Promise<IMatchModel>;
  endGame(matchId: number): Promise<void>;
}

export default IMatchService;
