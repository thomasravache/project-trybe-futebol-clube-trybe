import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import StatusCode from '../@types/enums';
import { app } from '../app';
import { Response } from 'superagent';
import ClubModel from '../database/models/ClubModel';
import { clubs } from './mockData';
import { LeaderBoardResponse } from '../@types/types';

chai.use(chaiHttp);

const { expect } = chai;

describe('------ Leaderboard ------', () => {
  before(async () => {
    sinon.stub(ClubModel, 'findAll').resolves(clubs);
  });

  after(() => {
    (ClubModel.findAll as sinon.SinonStub).restore();
  });

  describe('\nQuando o request é feito na rota GET /leaderboard', () => {
    let response: Response;

    before(async () => {
      response = await chai.request(app).get('/leaderboard');
    });

    it('deve retornar status 200', () => {
      expect(response).to.have.status(StatusCode.OK);
    });

    it('body deve ser um array', () => {
      expect(response.body).to.be.an('array');
    });

    it('o array de conter objetos com propriedades de um leaderboard', () => {
      response.body.forEach((element: LeaderBoardResponse) => {
        expect(element).to.be.an('object');
        expect(element).to.have.all.keys(
          'name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws',
          'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency',
        );
      });
    });
  });

  describe('\nQuando o request é feito na rota GET /leaderboard/home', () => {
    let response: Response;

    before(async () => {
      response = await chai.request(app).get('/leaderboard/home');
    });

    it('deve retornar status 200', () => {
      expect(response).to.have.status(StatusCode.OK);
    });

    it('body deve ser um array', () => {
      expect(response.body).to.be.an('array');
    });

    it('o array de conter objetos com propriedades de um leaderboard', () => {
      response.body.forEach((element: LeaderBoardResponse) => {
        expect(element).to.be.an('object');
        expect(element).to.have.all.keys(
          'name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws',
          'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency',
        );
      });
    });
  });

  describe('\nQuando o request é feito na rota GET /leaderboard/away', () => {
    let response: Response;

    before(async () => {
      response = await chai.request(app).get('/leaderboard/away');
    });

    it('deve retornar status 200', () => {
      expect(response).to.have.status(StatusCode.OK);
    });

    it('body deve ser um array', () => {
      expect(response.body).to.be.an('array');
    });

    it('o array de conter objetos com propriedades de um leaderboard', () => {
      response.body.forEach((element: LeaderBoardResponse) => {
        expect(element).to.be.an('object');
        expect(element).to.have.all.keys(
          'name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws',
          'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency',
        );
      });
    });
  });
})