import { Router, Request, Response, NextFunction } from 'express';
import { IController, ILoginService, IRequest, IUserResponse } from '../@types/interfaces';
import StatusCode from '../@types/enums';
import { LoginResponse, LoginRequest } from '../@types/types';
import { SchemaFactory, ServiceFactory } from '../factories';
import Authenticator from '../jwtHandler/Authenticator';

class LoginController implements IController {
  public readonly service: ILoginService;

  public readonly router: Router;

  constructor(router: Router = Router(), service: ILoginService = ServiceFactory.login()) {
    this.service = service;
    this.router = router;

    this.login = this.login.bind(this);
  }

  private async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const loginRequest: LoginRequest = req.body;

      SchemaFactory.validate<LoginRequest>(SchemaFactory.loginSchema(), loginRequest);

      const loginResult: LoginResponse = await this.service.login(loginRequest);

      return res.status(StatusCode.OK).json(loginResult);
    } catch (e) {
      return next(e);
    }
  }

  private static async validate(
    req: IRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { role } = req.user as IUserResponse;

      return res.status(StatusCode.OK).send(role);
    } catch (e) {
      return next(e);
    }
  }

  public buildRoutes(): Router {
    this.router.post('/', this.login);
    this.router.get('/validate', new Authenticator().authMiddleware, LoginController.validate);

    return this.router;
  }
}

export default LoginController;
