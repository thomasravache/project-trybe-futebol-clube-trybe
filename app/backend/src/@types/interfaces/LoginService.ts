import IService from './Service';
import { LoginRequest, LoginResponse } from '../types';

interface ILoginService extends IService {
  login(loginRequest: LoginRequest): Promise<LoginResponse>
}

export default ILoginService;
