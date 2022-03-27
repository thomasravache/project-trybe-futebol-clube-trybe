import { Router } from 'express';
import { LoginController, ClubController, MatchController } from '../controllers';
import { ILoginService, IClubService, IMatchService } from '../@types/interfaces';

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
}

export default ControllerFactory;
