import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';
import StatusCode from '../@types/enums';
import { LoginRequest } from '../@types/types';

chai.use(chaiHttp);

const { expect } = chai;

describe('------- Login -------', () => {
  before(async () => {
    sinon.stub(UserModel, 'findOne').resolves(
      {
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com.br',
        password: '1234567',
      } as UserModel
    )
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  describe('Quando o login é realizado com sucesso', () => {
    let response: Response;

    before(async () => {
      response = await chai.request(app).post('/login').send({
        email: 'Admin',
        password: '1234567',
      } as LoginRequest
      );
    });

    it('retorna http status 200', () => {
      expect(response).to.have.status(StatusCode.OK);
    });

    it('tenha a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('tenha a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    })
  })
});