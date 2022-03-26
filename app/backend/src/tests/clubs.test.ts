import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import { IClubModel } from '../@types/interfaces';
import { Response } from 'superagent';
import StatusCode from '../@types/enums';
import { app } from '../app';
import ClubModel from '../database/models/ClubModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('------ Clubs -------', () => {
  before(async () => {
    sinon.stub(ClubModel, 'findAll').resolves([
      {
        id: 1,
        clubName: 'Timaço',
      },
      {
        id: 2,
        clubName: 'Amigão'
      },
      {
        id: 3,
        clubName: 'Os bacana',
      },
    ] as IClubModel[]);
  });

  after(() => {
    (ClubModel.findAll as sinon.SinonStub).restore();
  });

  describe('\nRequest da rota /clubs', () => {
    describe('deve retornar todos os clubes', () => {
      let response: Response;

      before(async () => {
        response = await chai.request(app).get('/clubs');
      });

      it('deve retornar status "200"', () => {
        expect(response).to.have.status(StatusCode.OK);
      });

      it('deve conter um array', () => {
        expect(response.body).to.be.an('array');
      });

      it('cada elemento do array deve conter um objeto com as propriedades "id", "clubName"', () => {
        response.body.forEach((element: IClubModel) => {
          expect(element).to.be.an('object');
          expect(element).to.have.all.keys('id', 'clubName');
        });
      });
    });
  });
});