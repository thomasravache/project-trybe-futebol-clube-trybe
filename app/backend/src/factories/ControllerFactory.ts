import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import { ILoginService } from '../@types/interfaces';

class ControllerFactory {
  public static login(router?: Router, service?: ILoginService): LoginController {
    return new LoginController(router, service);
  }
}

export default ControllerFactory;
