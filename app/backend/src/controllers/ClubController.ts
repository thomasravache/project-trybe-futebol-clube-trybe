import { Router, Response, Request, NextFunction } from 'express';
import StatusCode from '../@types/enums';
import { IController, IClubService } from '../@types/interfaces';
import { ServiceFactory } from '../factories';

class ClubController implements IController {
  public readonly service: IClubService;

  public readonly router: Router;

  constructor(router: Router = Router(), service: IClubService = ServiceFactory.club()) {
    this.service = service;
    this.router = router;

    this.getAll = this.getAll.bind(this);
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const clubs = await this.service.getAll();

      return res.status(StatusCode.OK).json(clubs);
    } catch (e) {
      return next(e);
    }
  }

  public buildRoutes(): Router {
    this.router.get('/', this.getAll);

    return this.router;
  }
}

export default ClubController;
