/* eslint-disable no-unused-expressions */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// const debug = require('debug')('b-rscase:test:service.test.js');
// const chalk = require('chalk');
const { expect } = require('chai');
const currencyRate = require('../lib/data/api/currency-data');
const stockPrice = require('../lib/data/api/stock-data');
const goldPrice = require('../lib/data/api/gold-data');

describe('service tests', () => {
  describe('currency-rate tests', () => {
    it('should return a value because USD/SEK exists', async () => {
      const response = await currencyRate.currencyRate('USD', 'SEK');
      expect(response.price).to.approximately(9, 1);
      expect(response.name).to.be.equal('USD/SEK');
      expect(response.changePercent).to.not.exist;
      expect(response.symbol).to.exist;
    }).timeout(10000);
    it('should return value 1 because SEK/SEK is the same', async () => {
      const response = await currencyRate.currencyRate('SEK', 'SEK');
      expect(response.price).to.be.to.equal(1);
      expect(response.name).to.be.equal('SEK/SEK');
      expect(response.changePercent).to.not.exist;
      expect(response.symbol).to.exist;
    }).timeout(10000);
    it('should return error because abc123/xyz does not exist', async () => {
      try {
        await currencyRate.currencyRate('abc123', 'xyz');
        expect(true).to.be.false;
      } catch (err) {
        expect(err).to.exist;
        expect(err.message).to.be.equal('Incorrect currency pair');
      }
    });
  });
  describe('stock-price tests', () => {
    it('should return a value because AAPL exists', async () => {
      const symbol = ['AAPL'];
      const response = await stockPrice.realTime(symbol);
      expect(response[0].symbol).to.be.equal(symbol[0]);
      expect(Number(response[0].price)).to.be.approximately(150, 100);
      expect(response[0].changePercent).to.exist;
      expect(response[0].name).to.exist;
    }).timeout(10000);
    it('should return correctly because symbols exists', async () => {
      const symbols = ['AAPL', 'LEO.ST', 'NDA-SE.ST', 'ERIC-B.ST'];
      const response = await stockPrice.realTime(symbols);

      expect(response[0].symbol).to.be.equal(symbols[0]);
      expect(Number(response[0].price)).to.be.approximately(150, 100);
      expect(response[0].changePercent).to.exist;
      expect(response[0].name).to.exist;
      expect(response[1].symbol).to.be.equal(symbols[3]);
      expect(Number(response[1].price)).to.be.approximately(80, 50);
      expect(response[1].changePercent).to.exist;
      expect(response[1].name).to.exist;
      expect(response[2].symbol).to.be.equal(symbols[1]);
      expect(Number(response[2].price)).to.be.approximately(40, 100);
      expect(response[2].changePercent).to.exist;
      expect(response[3].name).to.exist;
      expect(response[3].symbol).to.be.equal(symbols[2]);
      expect(Number(response[3].price)).to.be.approximately(80, 100);
      expect(response[3].changePercent).to.exist;
      expect(response[3].name).to.exist;
    }).timeout(10000);
    it('should return error because xyz.st does not exist', async () => {
      try {
        await stockPrice.realTime('xyz.st');
        expect(true).to.be.false;
      } catch (err) {
        expect(err).to.exist;
      }
    });
    it('should return correctly because THQ exists', async () => {
      const response = await stockPrice.delay('THQ');
      expect(response.name).to.be.equal('THQ Nordic B');
      expect(response.price).to.be.approximately(150, 100);
    }).timeout(10000);
    it('should return correctly because xyz does not exists', async () => {
      try {
        await stockPrice.realTime('xyz');
        expect(true).to.be.false;
      } catch (err) {
        expect(err).to.exist;
      }
    }).timeout(10000);
  });
  describe('gold-price tests', () => {
    it('should return rate of gold', async () => {
      const response = await goldPrice.goldprice();
      expect(response.price).to.be.approximately(1300, 250);
      expect(response.name).to.be.equal('Gold');
      expect(response.changePercent).to.not.exist;
      expect(response.symbol).to.exist;
    });
  });
});
