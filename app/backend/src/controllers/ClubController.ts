import { Router, Response, Request, NextFunction } from 'express';
import StatusCode from '../@types/enums';
import { IController, IClubService } from '../@types/interfaces';
import { ServiceFactory } from '../factories';

class ClubController implements IController {
  public readonly service: IClubService;

  public readonly router: Router;

  constructor(router: Router = Router(), service: IClubService = ServiceFactory.clubs()) {
    this.service = service;
    this.router = router;

    this.getAll = this.getAll.bind(this);
    this.findOne = this.findOne.bind(this);
  }

  private async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const clubs = await this.service.getAll();

      return res.status(StatusCode.OK).json(clubs);
    } catch (e) {
      return next(e);
    }
  }

  private async findOne(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;

      const club = await this.service.findOne(parseInt(id, 10));

      return res.status(StatusCode.OK).json(club);
    } catch (e) {
      return next(e);
    }
  }

  public buildRoutes(): Router {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.findOne);

    return this.router;
  }
}

export default ClubController;
