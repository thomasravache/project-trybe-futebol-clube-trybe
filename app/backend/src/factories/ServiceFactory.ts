import { IClubModel, IUserModel } from '../@types/interfaces';
import { ModelStatic } from '../@types/types';
import { LoginService, ClubService } from '../services';

class ServiceFactory {
  public static login(model?: ModelStatic<IUserModel>) {
    return new LoginService(model);
  }

  public static clubs(model?: ModelStatic<IClubModel>) {
    return new ClubService(model);
  }
}

export default ServiceFactory;
