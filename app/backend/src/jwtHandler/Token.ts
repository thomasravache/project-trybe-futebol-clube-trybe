import * as Jwt from 'jsonwebtoken';
import { JwtOptions } from '../@types/types';
import { IJwtPayload } from '../@types/interfaces';
import secret from './secret';

class Token {
  private _payload: IJwtPayload;

  private _secret: Jwt.Secret;

  private _options: JwtOptions;

  constructor(payload: IJwtPayload, jwtOptions: JwtOptions) {
    this._payload = payload;
    this._secret = secret;
    this._options = jwtOptions;
  }

  public get token(): string {
    const jwtToken = Jwt.sign(this._payload, this._secret, this._options);

    return jwtToken;
  }
}

export default Token;
