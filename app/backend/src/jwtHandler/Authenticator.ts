import * as Jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { JwtOptions } from '../@types/types';
import { IJwtPayload, IRequest } from '../@types/interfaces';
import secret from './secret';
import StatusCode from '../@types/enums';
import UserModel from '../database/models/UserModel';

class Authenticator {
  private readonly _secret: Jwt.Secret;

  private _options: JwtOptions;

  constructor() {
    this._secret = secret;
    this._options = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };
    this.authMiddleware = this.authMiddleware.bind(this);
  }

  public generateToken(payload: IJwtPayload, options: JwtOptions = this._options): string {
    const jwtToken = Jwt.sign(payload, this._secret, options);

    return jwtToken;
  }

  private verify(token: string): IJwtPayload {
    const payload = Jwt.verify(token, this._secret, { algorithms: ['HS256'] });

    return payload as IJwtPayload;
  }

  public async authMiddleware(
    req: IRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token) return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token not found' });

    try {
      const payload = this.verify(token);
      const user = await UserModel
        .findOne({ where: { id: payload.userId }, attributes: { exclude: ['password'] } });

      if (!user) return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Error token user' });

      req.user = user;

      return next();
    } catch (e) {
      console.error(e);
      return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Invalid token' });
    }
  }
}

export default Authenticator;
