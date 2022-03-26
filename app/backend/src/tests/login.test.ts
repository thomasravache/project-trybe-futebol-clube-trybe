import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';
import StatusCode from '../@types/enums';
import { LoginRequest } from '../@types/types';

chai.use(chaiHttp);

const { expect } = chai;

describe('------- Login -------', () => {
  before(async () => {
    const encryptedPassword = await bcrypt.hash('1234567', 8);

    sinon.stub(UserModel, 'findOne').resolves(
      {
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com.br',
        password: encryptedPassword,
      } as UserModel
    )
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  describe('\nRequest da rota /login', () => {
    describe('Quando o login é realizado com sucesso', () => {
      let response: Response;
  
      before(async () => {
        response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com.br',
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
    });
  
    describe('Quando o user não existe ou a senha está incorreta', () => {
      let response: Response;
  
      before(async () => {
        response = await chai.request(app).post('/login').send({
          email: 'fake@fake.com',
          password: 'senhafake'
        } as LoginRequest);
      });
  
      it('retorna http status 401', () => {
        expect(response).to.have.status(StatusCode.UNAUTHORIZED);
      });
  
      it ('deve ter a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      })
  
      it ('deve retornar a mensagem "Incorrect email or password"', () => {
        expect(response.body.message).to.be.equal('Incorrect email or password');
      })
    })
  
    describe('Quando o username ou password não são informados', () => {
      let response: Response;
  
      before(async () => {
        response = await chai.request(app).post('/login').send({});
      });
  
      it('retorna http status 401', () => {
        expect(response).to.have.status(StatusCode.UNAUTHORIZED);
      });
  
      it('deve ter a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });
  
      it('deve retornar a mensagem "All fields must be filled"', () => {
        expect(response.body.message).to.be.equal('All fields must be filled');
      });
    });
  });

  describe('\nRequest da rota /login/validate', () => {
    describe('Quando faz a requisição', () => {
      let token: string;
      let response: Response;

      before(async () => {
        const loginResponse = await chai.request(app).post('/login').send({
          email: 'admin@admin.com.br',
          password: '1234567',
        } as LoginRequest);

        token = loginResponse.body.token;

        response = await chai.request(app)
          .get('/login/validate').set('Authorization', token);
      });

      it('retorna status 200', () => {
        expect(response).to.have.status(StatusCode.OK);
      });

      it('retorna a role do usuário', () => {
        expect(response.text).to.be.equal('admin');
      });
    });
  });
});
