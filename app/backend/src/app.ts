import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import ErrorHandler from './errors/ErrorHandler';
import LoginController from './controllers/LoginController';

const loginRoutes = new LoginController().buildRoutes();

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorMiddlewares();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use('/login', loginRoutes);
  }

  private errorMiddlewares(): void {
    this.app.use(ErrorHandler.inputError);
    this.app.use(ErrorHandler.domainError);
    this.app.use(ErrorHandler.serverError);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Ouvindo na porta ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
