import { Router, Response, Request, NextFunction } from 'express';
import StatusCode from '../@types/enums';
import { IController, IMatchService } from '../@types/interfaces';
import { ServiceFactory } from '../factories';

class MatchController implements IController {
  public readonly service: IMatchService;

  public readonly router: Router;

  constructor(router: Router = Router(), service: IMatchService = ServiceFactory.matchs()) {
    this.service = service;
    this.router = router;

    this.getAll = this.getAll.bind(this);
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

  public buildRoutes(): Router {
    this.router.get('/', this.getAll);

    return this.router;
  }
}

export default MatchController;
