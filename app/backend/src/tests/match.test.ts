import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import StatusCode from '../@types/enums';
import { app } from '../app';
import { Response } from 'superagent';
import { IMatchModelResponse, IMatchModelRequest } from '../@types/interfaces';
import MatchModel from '../database/models/MatchModel';
import { matchs } from './mockData';
import UserModel from '../database/models/UserModel';
import * as bcrypt from 'bcryptjs';
import { LoginRequest } from '../@types/types';

chai.use(chaiHttp);

const { expect } = chai;

const createFake = async (newMatch: any): Promise<any> => {
  matchs.push(newMatch);

  return {
    id: new Date().getTime(),
    ...newMatch,
  } as any;
}

const updateFake = async ({ inProgress }: any, { where: { id } }: any): Promise<any> => {
  const index = matchs.findIndex((match) => match.id === id);

  matchs.splice(index, 1, {
    ...matchs[index],
    inProgress: inProgress,
  } as any);
}

describe('------ Matchs ------', () => {
  
  before(async () => {
    const encryptedPassword = await bcrypt.hash('1234567', 8);
    sinon.stub(UserModel, 'findOne').resolves({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com.br',
      password: encryptedPassword,
    } as UserModel);
    sinon.stub(MatchModel, 'findAll').resolves(matchs);
    sinon.stub(MatchModel, 'create').callsFake(createFake);
    sinon.stub(MatchModel, 'update').callsFake(updateFake);
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
    (MatchModel.findAll as sinon.SinonStub).restore();
    (MatchModel.create as sinon.SinonStub).restore();
    (MatchModel.update as sinon.SinonStub).restore();
  });

  describe('\nQuando o request é feito na rota GET /matchs', () => {
    describe('deve retornar todas as partidas', () => {
      let response: Response;

      before(async () => {
        response = await chai.request(app).get('/matchs');
      });

      it('onde o status deve ser 200', () => {
        expect(response).to.have.status(StatusCode.OK);
      });

      it('onde o body retorna um array', () => {
        expect(response.body).to.be.an('array');
      });

      it('onde cada elemento do array contém um objeto com as chaves de uma match', () => {
        response.body.forEach((element: IMatchModelResponse) => {
          expect(element).to.be.an('object');
          expect(element).to.have.all.keys(
            'id', 'homeTeam', 'homeTeamGoals', 'awayTeam',
            'awayTeamGoals', 'inProgress', 'homeClub', 'awayClub',
          );
          expect(element.homeClub).to.be.an('object');
          expect(element.awayClub).to.be.an('object');
        });
      });
    });
  });

  describe('\nQuando o request é feito na rota POST /matchs', () => {
    let token: string;

    before(async () => {
      token = await chai.request(app).post('/login').send({
        email: 'admin@admin.com.br',
        password: '1234567',
      }).then(({ body }) => body.token);
    });

    describe('deve criar a partida', () => {
      let firstMatchList: Response;
      let createRequest: Response;
      let secondMatchList: Response;

      before(async () => {
        firstMatchList = await chai.request(app).get('/matchs');

        createRequest = await chai.request(app).post('/matchs').set('Authorization', token)
          .send({
            homeTeam: 16,
            awayTeam: 8,
            homeTeamGoals: 2,
            awayTeamGoals: 2,
            inProgress: true,
          } as IMatchModelRequest);

        secondMatchList = await chai.request(app).get('/matchs');
      });

      it('primeira requisição deve retornar a quantidade de registros atual', () => {
        expect(firstMatchList.body).to.have.length(3);
      });

      it('createRequest retorna status "201"', () => {
        expect(createRequest).to.have.status(StatusCode.CREATED);
      });

      it ('createRequest deve retornar um objeto', () => {
        expect(createRequest.body).to.be.an('object');
      });

      it('o objeto retornado pela createRequest deve possuir as chaves de uma match', () => {
        expect(createRequest.body).to.have.all.keys('id', 'homeTeam', 'awayTeam', 'homeTeamGoals', 'awayTeamGoals', 'inProgress');
      });

      it('após a criação deve retornar todos os registros de matchs com o registro criado', () => {
        expect(secondMatchList.body).to.have.length(4);
      });
    });

    describe('não deve permitir que homeTeam e awayTeam tenham o mesmo valor', () => {
      let createRequest: Response;

      before(async () => {
        createRequest = await chai.request(app).post('/matchs').set('Authorization', token)
        .send({
          homeTeam: 8,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true,
        } as IMatchModelRequest);
      });

      it('deve retornar status 401', () => {
        expect(createRequest).to.have.status(StatusCode.UNAUTHORIZED);
      });

      it('deve ter a propriedade "message" no body', () => {
        expect(createRequest.body).to.have.property('message');
      });

      it('message deve ter a mensagem: "It is not possible to create a match with two equal teams"', () => {
        expect(createRequest.body.message).to.be.equal('It is not possible to create a match with two equal teams');
      });
    });
  });

  describe('\nQuando o request é feito na rota PATCH /matchs/:id/finish', () => {
    describe('deve finalizar uma partida', () => {
      let token: string;
      let response: Response;
      const idToUpdate: number = 2;

      before(async () => {
        token = await chai.request(app).post('/login')
          .send({
            email: 'admin@admin.com.br',
            password: '1234567',
          } as LoginRequest)
          .then(({ body }) => body.token);

        response = await chai.request(app)
        .patch(`/matchs/${idToUpdate}/finish`)
        .set('Authorization', token);
      });

      it('retornando response status 200', () => {
        expect(response).to.have.status(StatusCode.OK);
      });

      it('a partida informada nos parametros deve estar com inProgress = false', () => {
        const match = matchs.find((match) => match.id === idToUpdate);
        expect(match.inProgress).to.be.equal(false);
      });
    });
  })

  // describe('\nQuando o request é feito na /matchs?inProgress', () => {
  //   describe('e o inProgress é "true":', () => {
  //     let response: Response;

  //     before(async () => {
  //       sinon.stub(new MatchService(), 'getAll')
  //       response = await chai.request(app)
  //         .get('/matchs')
  //         .query({ inProgress: true });
  //     });

  //     it('o status deve ser 200', () => {
  //       expect(response).to.have.status(StatusCode.OK);
  //     });

  //     it('o body deve conter um array', () => {
  //       expect(response.body).to.be.an('array');
  //     });

  //     it('deve retornar apenas os elementos que possuem inProgress: true', () => {
  //       response.body.forEach((element: IMatchModelResponse) => {
  //         expect(element.inProgress).to.be.equal(true);
  //       });
  //     });
  //   });

  //   describe('e o inProgress é "false":', () => {
  //     let response: Response;

  //     before(async () => {
  //       response = await chai.request(app)
  //         .get('/matchs')
  //         .query({ inProgress: false });
  //     });

  //     it('o status deve ser 200', () => {
  //       expect(response).to.have.status(StatusCode.OK);
  //     });

  //     it('o body deve conter um array', () => {
  //       expect(response.body).to.have.an('array');
  //     });

  //     it('deve retornar apenas os elementos que possuem inProgress: false', () => {
  //       response.body.forEach((element: IMatchModelResponse) => {
  //         console.log(element.inProgress);
  //         expect(element.inProgress).to.be.equal(false);
  //       });
  //     });
  //   });
  // });
});
