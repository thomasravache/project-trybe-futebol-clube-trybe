import * as chai from 'chai';
import { App } from '../app';

const { expect } = chai;

describe('---- app.ts -----', () => {
  it('App deve ser uma classe', () => {
    expect(new App()).to.be.an('object');
  });

  it('deve ter o método start e seu retorno deve ser vazio', () => {
    const app = new App();

    expect(app.start).to.be.a('function');
    expect(app.start(3000)).to.be.a('undefined');
  });

  it('o método config deve existir e ser privado', () => {
    const app = new App();

    expect(app['config']).to.be.a('function');
    expect(app['config']()).to.be.a('undefined');
  })
});
