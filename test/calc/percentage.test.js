/* eslint-disable no-unused-expressions */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// const debug = require('debug')('b-rscase:test:service.test.js');
// const chalk = require('chalk');
const { expect } = require('chai');
const userPercent = require('../../service/calc/user-percentage');
const secPercent = require('../../service/calc/security-percentage');

describe('percentage-calc tests', () => {
  describe('user-percentage', () => {
    it('should return 0 because index is 100', () => {
      expect(userPercent.percentage(100)).to.be.equal(0);
    });
    it('should return 11 because index is 111', () => {
      expect(userPercent.percentage(111)).to.be.equal(11);
    });
    it('should return -5 because index is 95', () => {
      expect(userPercent.percentage(95)).to.be.equal(-5);
    });
    it('should return 15.55 because index is 115.55', () => {
      expect(userPercent.percentage(115.55)).to.be.equal(15.55);
    });
    it('should return -3.44 because index is 96.56', () => {
      expect(userPercent.percentage(96.56)).to.be.equal(-3.44);
    });
  });
  describe('security-percentage', () => {
    it('should return 10 because stock is up 10%', () => {
      expect(secPercent.percentage(33, 30)).to.be.equal(10.00);
    });
    it('should return -5 because stock down 5%', () => {
      expect(secPercent.percentage(47.5, 50)).to.be.equal(-5.00);
    });
    it('should return 7,24 because stock up 7,24%', () => {
      expect(secPercent.percentage(1466, 1367)).to.be.equal(7.24);
    });
  });
});
