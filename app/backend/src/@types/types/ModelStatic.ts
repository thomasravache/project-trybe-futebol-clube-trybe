import { BuildOptions, Model } from 'sequelize';

type ModelStatic<T extends Model> = typeof Model & {
  new(values?: object, options?: BuildOptions): T; // https://stackoverflow.com/questions/57129544/typescript-sequelize-pass-in-generic-model e modificado por mim
};

export default ModelStatic;
