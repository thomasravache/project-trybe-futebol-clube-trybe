import UserModel from '../database/models/UserModel';
import { JwtOptions, LoginRequest, LoginResponse, ModelStatic } from '../@types/types';
import Service from './Service';
import CustomError from '../errors/CustomError';
import StatusCode from '../@types/enums';
import { IJwtPayload, ILoginService, IUserModel } from '../@types/interfaces';
import Token from '../jwtHandler/Token';

const jwtOptions: JwtOptions = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

class LoginService extends Service implements ILoginService {
  public readonly model: ModelStatic<IUserModel>;

  constructor(model: ModelStatic<IUserModel> = UserModel) {
    super();

    this.model = model;
  }

  public async login({ email, password }: LoginRequest): Promise<LoginResponse> {
    const user = await this.model.findOne({ where: { email } });

    if (!user || user.password !== password) {
      throw new CustomError('Incorrect email or password', StatusCode.UNAUTHORIZED);
    }

    const jwtPayload: IJwtPayload = {
      userId: user.id,
      email,
    };

    const { token } = new Token(jwtPayload, jwtOptions);

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
