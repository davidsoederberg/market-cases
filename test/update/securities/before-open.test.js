const { expect } = require('chai');
const mongoose = require('mongoose');
const debug = require('debug')('b-rscase:test:update:securities:before-open.test.js');
const chalk = require('chalk');
const Security = require('../../../models/securities');
const secBeforeOpen = require('../../../lib/data/update/securities/before-open');

before((done) => {
  mongoose.connect('mongodb://localhost/test_db', { useNewUrlParser: true });
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      debug(chalk.red(error));
      done(error);
    });
});

beforeEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    done();
  });
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    done();
  });
});

after((done) => {
  mongoose.connection.close(() => {
    done();
  });
});

describe('securities before-open update', () => {
  it('should reset intadayData', (done) => {
    const gold = Security({
      name: 'Gold', type: 3, symbol: 'Gold', startingPrice: 1000, intradayData: [{ price: 1000, time: 'test' }, { price: 1001, time: 'test2' }],
    });
    gold.save()
      .then(async () => {
        expect(gold.intradayData).be.length(2);
        await secBeforeOpen.reset();
        Security.findById(gold.id, (err, doc) => {
          if (err) {
            done(err);
          } else {
            expect(doc.intradayData).to.be.length(0);
            done();
          }
        });
      });
  });
  it('should reset intradayData - testing many', (done) => {
    const gold = Security({
      name: 'Gold', type: 3, symbol: 'Gold', startingPrice: 1000, intradayData: [{ price: 1000, time: 'test' }, { price: 1001, time: 'test2' }],
    });
    const leo = Security({
      name: 'LeoVegas', type: 0, symbol: 'LEO.ST', startingPrice: 40, intradayData: [{ price: 1000, time: 'test' }, { price: 1001, time: 'test2' }],
    });
    const thq = Security({
      name: 'THQ Nordic', type: 1, symbol: 'THQN B', startingPrice: 150, intradayData: [{ price: 1000, time: 'test' }, { price: 1001, time: 'test2' }],
    });
    const us = Security({
      name: 'USD/SEK', type: 2, symbol: 'USD/SEK', startingPrice: 9, intradayData: [{ price: 1000, time: 'test' }, { price: 1001, time: 'test2' }],
    });
    gold.save()
      .then(() => {
        leo.save()
          .then(() => {
            thq.save()
              .then(() => {
                us.save()
                  .then(async () => {
                    await secBeforeOpen.reset();
                    Security.findById(gold.id, (err, doc) => {
                      if (err) {
                        debug(chalk.red(err));
                        done(err);
                      } else {
                        expect(doc.intradayData).to.be.length(0);
                      }
                    });
                    Security.findById(leo.id, (err, doc) => {
                      if (err) {
                        debug(chalk.red(err));
                        done(err);
                      } else {
                        expect(doc.intradayData).to.be.length(0);
                      }
                    });
                    Security.findById(thq.id, (err, doc) => {
                      if (err) {
                        debug(chalk.red(err));
                        done(err);
                      } else {
                        expect(doc.intradayData).to.be.length(0);
                      }
                    });
                    Security.findById(us.id, (err, doc) => {
                      if (err) {
                        debug(chalk.red(err));
                        done(err);
                      } else {
                        expect(doc.intradayData).to.be.length(0);
                        done();
                      }
                    });
                  });
              });
          });
      });
  });
});
