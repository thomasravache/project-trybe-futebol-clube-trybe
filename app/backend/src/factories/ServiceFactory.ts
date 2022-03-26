import { IUserModel } from '../@types/interfaces';
import { ModelStatic } from '../@types/types';
import LoginService from '../services/LoginService';

class ServiceFactory {
  public static login(model?: ModelStatic<IUserModel>) {
    return new LoginService(model);
  }
}

export default ServiceFactory;
