import * as Joi from 'joi';
import { IMatchModel, ISchema } from '../../@types/interfaces';

class MatchSchema implements ISchema<IMatchModel> {
  private _schema: Joi.ObjectSchema<IMatchModel>;

  public schema(): Joi.ObjectSchema<IMatchModel> {
    this._schema = Joi.object({
      homeTeam: Joi.number().required(),
      awayTeam: Joi.number().required(),
      homeTeamGoals: Joi.number().required(),
      awayTeamGoals: Joi.number().required(),
      inProgress: Joi.boolean().required(),
    });

    return this._schema;
  }
}

export default MatchSchema;
