import { Router } from 'express';
import {
  LoginController, ClubController, MatchController, LeaderboardController,
} from '../controllers';
import {
  ILoginService, IClubService, IMatchService, ILeaderboardService,
} from '../@types/interfaces';

class ControllerFactory {
  public static login(router?: Router, service?: ILoginService): LoginController {
    return new LoginController(router, service);
  }

  public static clubs(router?: Router, service?: IClubService): ClubController {
    return new ClubController(router, service);
  }

  public static matchs(router?: Router, service?: IMatchService): MatchController {
    return new MatchController(router, service);
  }

  public static leaderboard(
    router?: Router,
    service?: ILeaderboardService,
  ): LeaderboardController {
    return new LeaderboardController(router, service);
  }
}

export default ControllerFactory;
