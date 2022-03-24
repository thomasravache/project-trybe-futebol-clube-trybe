import { Router, Request, Response, NextFunction } from 'express';
import LoginService from '../services/LoginService';
import { ILoginService } from '../@types/interfaces';
import StatusCode from '../@types/enums';
import { LoginResponse, LoginRequest } from '../@types/types';

class LoginController {
  private _service: ILoginService;

  private _router: Router;

  constructor(router: Router = Router(), service: ILoginService = new LoginService()) {
    this._service = service;
    console.log(service);
    this._router = router;

    this.login = this.login.bind(this);
  }

  private async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const loginRequest: LoginRequest = req.body;

      const loginResult: LoginResponse = await this._service.login(loginRequest);

      return res.status(StatusCode.OK).json(loginResult);
    } catch (e) {
      return next(e);
    }
  }

  public buildRoutes(): Router {
    this._router.post('/', this.login);

    return this._router;
  }
}

export default LoginController;
