import { IMatchModelResponse } from './MatchModel';
import IService from './Service';

interface IMatchService extends IService {
  getAll(inProgressParam: unknown): Promise<IMatchModelResponse[]>;
}

export default IMatchService;
