import { Router, Response, Request, NextFunction } from 'express';
import Authenticator from '../jwtHandler/Authenticator';
import StatusCode from '../@types/enums';
import { IController, IMatchModel, IMatchService } from '../@types/interfaces';
import { SchemaFactory, ServiceFactory } from '../factories';

class MatchController implements IController {
  public readonly service: IMatchService;

  public readonly router: Router;

  constructor(router: Router = Router(), service: IMatchService = ServiceFactory.matchs()) {
    this.service = service;
    this.router = router;

    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  private async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { inProgress } = req.query;
      const matchs = await this.service.getAll(inProgress);

      return res.status(StatusCode.OK).json(matchs);
    } catch (e) {
      return next(e);
    }
  }

  private async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const createMatchRequest: IMatchModel = req.body;

      SchemaFactory.validate<IMatchModel>(SchemaFactory.matchSchema(), createMatchRequest);

      const createdMatch = await this.service.create(createMatchRequest);

      return res.status(StatusCode.CREATED).json(createdMatch);
    } catch (e) {
      return next(e);
    }
  }

  public buildRoutes(): Router {
    this.router.get('/', this.getAll);
    this.router.post('/', new Authenticator().authMiddleware, this.create);

    return this.router;
  }
}

export default MatchController;
