import { LoginRequest, LoginResponse } from '../types';

interface ILoginService {
  login(loginRequest: LoginRequest): Promise<LoginResponse>
}

export default ILoginService;
