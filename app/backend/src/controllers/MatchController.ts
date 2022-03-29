import { Router, Response, Request, NextFunction } from 'express';
import Authenticator from '../jwtHandler/Authenticator';
import StatusCode from '../@types/enums';
import { IController, IMatchModel, IMatchService } from '../@types/interfaces';
import { /* SchemaFactory, */SchemaFactory, ServiceFactory } from '../factories';
import { UpdateMatchResultRequest } from '../@types/types';

class MatchController implements IController {
  public readonly service: IMatchService;

  public readonly router: Router;

  constructor(router: Router = Router(), service: IMatchService = ServiceFactory.matchs()) {
    this.service = service;
    this.router = router;

    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.endGame = this.endGame.bind(this);
    this.updateMatchResult = this.updateMatchResult.bind(this);
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

      const createdMatch = await this.service.create(createMatchRequest);

      return res.status(StatusCode.CREATED).json(createdMatch);
    } catch (e) {
      return next(e);
    }
  }

  private async endGame(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;

      await this.service.endGame(parseInt(id, 10));

      return res.status(StatusCode.OK).json({ message: 'OK' });
    } catch (e) {
      return next(e);
    }
  }

  private async updateMatchResult(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const editMatchRequest: UpdateMatchResultRequest = req.body;
      const { id } = req.params;

      SchemaFactory
        .validate<UpdateMatchResultRequest>(SchemaFactory.matchResultSchema(), editMatchRequest);

      await this.service.updateMatchResult(parseInt(id, 10), editMatchRequest);

      return res.status(StatusCode.OK).json({ message: 'OK' });
    } catch (e) {
      return next(e);
    }
  }

  public buildRoutes(): Router {
    this.router.get('/', this.getAll);
    this.router.post('/', new Authenticator().authMiddleware, this.create);
    this.router.patch('/:id/finish', new Authenticator().authMiddleware, this.endGame);
    this.router.patch('/:id', new Authenticator().authMiddleware, this.updateMatchResult);

    return this.router;
  }
}

export default MatchController;
