import { LeaderBoardResponse } from '../types';
import IService from './Service';

interface ILeaderboardService extends IService {
  getAll(): Promise<LeaderBoardResponse[]>;
  getAllHome(): Promise<LeaderBoardResponse[]>;
  getAllAway(): Promise<LeaderBoardResponse[]>;
}

export default ILeaderboardService;
