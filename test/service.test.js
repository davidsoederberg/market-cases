/* eslint-disable no-unused-expressions */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { expect } = require('chai');
const currencyRate = require('../service/currency_rate');
const stockPrice = require('../service/stock_price');
const goldPrice = require('../service/gold_price');

describe('service tests', () => {
  describe('currency-rate tests', () => {
    it('should return a value because USD/SEK exists', async () => {
      const price = Number(await currencyRate.currencyRate('USD', 'SEK'));
      expect(price).to.approximately(9, 0.5);
    }).timeout(10000);
    it('should return value 1 because SEK/SEK is the same', async () => {
      const price = Number(await currencyRate.currencyRate('SEK', 'SEK'));
      expect(price).to.be.to.equal(1);
    }).timeout(10000);
    it('should return error because abc123/xyz does not exist', async () => {
      try {
        await currencyRate.currencyRate('abc123', 'xyz');
      } catch (err) {
        expect(err).to.exist;
        expect(err.message).to.be.equal('Incorrect currency pair');
      }
    });
  });
  describe('stock-price tests', () => {
    it('should return a value because AAPL exists', async () => {
      const price = await stockPrice.realTimeSharePrice('AAPL');
      expect(price).to.be.approximately(150, 50);
    }).timeout(10000);
    /* it('should return a value because THQN-B.st exists', async () => {
      const price = await stockPrice.realTimeSharePrice('THQN-B.st');
      expect(price).to.be.approximately(150, 100);
    }).timeout(10000); */
    it('should return error because xyz.st does not exist', async () => {
      try {
        await stockPrice.realTimeSharePrice('xyz.st');
      } catch (err) {
        expect(err).to.exist;
      }
    });
  });
  describe('gold-price tests', () => {
    it('should return value', async () => {
      const price = await goldPrice.goldprice();
      expect(price).to.be.approximately(1300, 250);
    });
  });
});
