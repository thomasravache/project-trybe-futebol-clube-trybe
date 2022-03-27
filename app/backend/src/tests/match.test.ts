import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import StatusCode from '../@types/enums';
import { app } from '../app';
import { Response } from 'superagent';
import { IMatchModelResponse } from '../@types/interfaces';
import MatchModel from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('------ Matchs ------', () => {
  before(async () => {
    sinon.stub(MatchModel, 'findAll').resolves([
      {
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
        homeClub: {
          clubName: "São Paulo"
        },
        awayClub: {
          clubName: "Grêmio"
        }
      },
      {
        id: 2,
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 9,
        awayTeamGoals: 0,
        inProgress: true,
        homeClub: {
          clubName: "São Paulo"
        },
        awayClub: {
          clubName: "Internacional"
        }
      },
      {
        id: 3,
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 9,
        awayTeamGoals: 0,
        inProgress: true,
        homeClub: {
          clubName: "Corinthians"
        },
        awayClub: {
          clubName: "Internacional"
        }
      }
    ] as IMatchModelResponse[]);
  });

  after(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
  });

  describe('\nQuando o request é feito na rota /matchs', () => {
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

  // describe('\nQuando o request é feito na /matchs?inProgress', () => {
  //   describe('e o inProgress é "true":', () => {
  //     let response: Response;

  //     before(async () => {
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
