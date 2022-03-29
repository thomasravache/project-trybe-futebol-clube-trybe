import { Router, Request, Response, NextFunction } from 'express';
import { ServiceFactory } from '../factories';
import { IController, ILeaderboardService } from '../@types/interfaces';
import StatusCode from '../@types/enums';

class LeaderboardController implements IController {
  public readonly service: ILeaderboardService;

  public readonly router: Router;

  constructor(
    router: Router = Router(),
    service: ILeaderboardService = ServiceFactory.leaderboard(),
  ) {
    this.router = router;
    this.service = service;

    this.getAll = this.getAll.bind(this);
    this.getAllHome = this.getAllHome.bind(this);
    this.getAllAway = this.getAllAway.bind(this);
  }

  private async getAll(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const clubs = await this.service.getAll();

      return res.status(StatusCode.OK).json(clubs);
    } catch (e) {
      return next(e);
    }
  }

  private async getAllHome(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const clubs = await this.service.getAllHome();

      return res.status(StatusCode.OK).json(clubs);
    } catch (e) {
      return next(e);
    }
  }

  private async getAllAway(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const clubs = await this.service.getAllAway();

      return res.status(StatusCode.OK).json(clubs);
    } catch (e) {
      return next(e);
    }
  }

  public buildRoutes(): Router {
    this.router.get('/', this.getAll);
    this.router.get('/home', this.getAllHome);
    this.router.get('/away', this.getAllAway);

    return this.router;
  }
}

export default LeaderboardController;
