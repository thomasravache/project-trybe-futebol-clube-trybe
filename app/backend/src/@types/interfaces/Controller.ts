import { Router } from 'express';
import IService from './Service';

interface IController {
  service: IService;
  router: Router;
  buildRoutes(): Router;
}

export default IController;
