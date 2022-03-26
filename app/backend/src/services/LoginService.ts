import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import { LoginRequest, LoginResponse, ModelStatic } from '../@types/types';
import CustomError from '../errors/CustomError';
import StatusCode from '../@types/enums';
import { IJwtPayload, ILoginService, IUserModel } from '../@types/interfaces';
import Authenticator from '../jwtHandler/Authenticator';

class LoginService implements ILoginService {
  public readonly model: ModelStatic<IUserModel>;

  constructor(model: ModelStatic<IUserModel> = UserModel) {
    this.model = model;
  }

  public async login({ email, password }: LoginRequest): Promise<LoginResponse> {
    const user = await this.model.findOne({ where: { email } });

    const comparedPasswords = await bcrypt.compare(password, !user ? '' : user.password);

    if (!user || comparedPasswords === false) {
      throw new CustomError('Incorrect email or password', StatusCode.UNAUTHORIZED);
    }

    const jwtPayload: IJwtPayload = { userId: user.id, email };

    const token = new Authenticator().generateToken(jwtPayload);

    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token,
    } as LoginResponse;
  }
}

export default LoginService;
