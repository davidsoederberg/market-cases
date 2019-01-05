/* eslint-disable no-unused-expressions */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// const debug = require('debug')('b-rscase:test:service.test.js');
// const chalk = require('chalk');
const { expect } = require('chai');
const calcUserIndex = require('../../service/calc/user-index');

describe('user-index calculation tests', () => {
  it('should return 100 because startingPrice equals current price', () => {
    const securities = [
      { long: true, startingPrice: 200, price: 200 },
      { long: true, startingPrice: 50, price: 50 },
    ];
    const index = calcUserIndex.index(securities);
    expect(index).to.be.equal(100.00);
  });
  it('should return 150 because together the stocks has risen 50%', () => {
    const securities = [
      { long: true, startingPrice: 100, price: 200 },
      { long: true, startingPrice: 50, price: 50 },
    ];
    const index = calcUserIndex.index(securities);
    expect(index).to.be.equal(150.00);
  });
  it('should return 98 because stock has risen 2% but the user was short', () => {
    const securities = [
      { long: false, startingPrice: 100, price: 102 },
    ];
    const index = calcUserIndex.index(securities);
    expect(index).to.be.equal(98.00);
  });
  it('should return 55 because stock has gone down 45%', () => {
    const securities = [
      { long: true, startingPrice: 200, price: 110 },
    ];
    const index = calcUserIndex.index(securities);
    expect(index).to.be.equal(55.00);
  });
  it('should return 96.67', () => {
    const securities = [
      { long: true, startingPrice: 100, price: 98 },
      { long: false, startingPrice: 30, price: 33 },
      { long: true, startingPrice: 50, price: 51 },
    ];
    const index = calcUserIndex.index(securities);
    expect(index).to.be.equal(96.67);
  });
  it('should return 107.29', () => {
    const securities = [
      { long: false, startingPrice: 100, price: 98 },
      { long: true, startingPrice: 30, price: 33 },
      { long: true, startingPrice: 1500, price: 1648 },
    ];
    const index = calcUserIndex.index(securities);
    expect(index).to.be.equal(107.29);
  });
  it('should return 109.64 (decimal test)', () => {
    const securities = [
      { long: false, startingPrice: 100.56, price: 102.45 },
      { long: true, startingPrice: 30.99, price: 37.55 },
    ];
    const index = calcUserIndex.index(securities);
    expect(index).to.be.equal(109.64);
  });
  it('should be NaN because wrong input', () => {
    const securities = [
      { long: false, price: 110 },
      { long: false, startingPrice: 200, price: 110 },
    ];
    expect(calcUserIndex.index(securities)).is.be.NaN;
  });
});
