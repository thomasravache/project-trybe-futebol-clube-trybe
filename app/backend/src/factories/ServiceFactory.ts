import { IClubModel, IMatchModel, IUserModel } from '../@types/interfaces';
import { ModelStatic } from '../@types/types';
import { LoginService, ClubService, MatchService, LeaderboardService } from '../services';

class ServiceFactory {
  public static login(model?: ModelStatic<IUserModel>) {
    return new LoginService(model);
  }

  public static clubs(model?: ModelStatic<IClubModel>) {
    return new ClubService(model);
  }

  public static matchs(model?: ModelStatic<IMatchModel>) {
    return new MatchService(model);
  }

  public static leaderboard(model?: ModelStatic<IClubModel>) {
    return new LeaderboardService(model);
  }
}

export default ServiceFactory;
