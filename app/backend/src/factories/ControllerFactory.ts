import { Router } from 'express';
import { LoginController, ClubController } from '../controllers';
import { ILoginService, IClubService } from '../@types/interfaces';

class ControllerFactory {
  public static login(router?: Router, service?: ILoginService): LoginController {
    return new LoginController(router, service);
  }

  public static club(router?: Router, service?: IClubService): ClubController {
    return new ClubController(router, service);
  }
}

export default ControllerFactory;
