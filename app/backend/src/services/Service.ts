import { Model, ModelStatic } from 'sequelize';

abstract class Service {
  abstract model: ModelStatic<Model>;
}

export default Service;
