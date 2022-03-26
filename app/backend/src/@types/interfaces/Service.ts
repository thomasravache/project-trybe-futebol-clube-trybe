import { Model } from 'sequelize/types';
import { ModelStatic } from '../types';

interface IService {
  model: ModelStatic<Model>;
}

export default IService;
