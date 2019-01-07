const { expect } = require('chai');
const mongoose = require('mongoose');
const debug = require('debug')('b-rscase:test:update:after-close.test.js');
const chalk = require('chalk');
const moment = require('moment');
// const User = require('../../models/user');
const Security = require('../../models/securities');
const secAfterClose = require('../../lib/data/update/after-close/update-securities-day');

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

describe('update: after-close testing', () => {
  describe('securities update', () => {
    it('should update with prices, correct day', (done) => {
      const gold = Security({
        name: 'Gold', type: 3, symbol: 'Gold', startingPrice: 1000,
      });
      gold.save()
        .then(async () => {
          await secAfterClose.update();
          Security.findById(gold.id, (err, doc) => {
            if (err) {
              debug(chalk.red(err));
              done(err);
            } else {
              expect(doc.name).to.be.equal('Gold');
              expect(doc.startingPrice).to.be.equal(1000);
              expect(doc.dayData).to.be.length(1);
              expect(doc.dayData[0].price).to.be.approximately(1300, 400);
              expect(doc.dayData[0].day).to.be.equal(moment().format('YYYY/MM/DD'));
            }
          });
          await secAfterClose.update();
          Security.findById(gold.id, (err, doc) => {
            if (err) {
              debug(chalk.red(err));
              done(err);
            } else {
              expect(doc.name).to.be.equal('Gold');
              expect(doc.startingPrice).to.be.equal(1000);
              expect(doc.dayData).to.be.length(2);
              expect(doc.dayData[0].price).to.be.approximately(1300, 400);
              expect(doc.dayData[0].day).to.be.equal(moment().format('YYYY/MM/DD'));
              done();
            }
          });
        });
    });
    it('should update with prices, correct day - testing all possible types', (done) => {
      const gold = Security({
        name: 'Gold', type: 3, symbol: 'Gold', startingPrice: 1000,
      });
      const leo = Security({
        name: 'LeoVegas', type: 0, symbol: 'LEO.ST', startingPrice: 40,
      });
      const thq = Security({
        name: 'THQ Nordic', type: 1, symbol: 'THQN B', startingPrice: 150,
      });
      const us = Security({
        name: 'USD/SEK', type: 2, symbol: 'USD/SEK', startingPrice: 9,
      });
      gold.save()
        .then(() => {
          leo.save()
            .then(() => {
              thq.save()
                .then(() => {
                  us.save()
                    .then(async () => {
                      await secAfterClose.update();
                      Security.findById(gold.id, (err, doc) => {
                        if (err) {
                          debug(chalk.red(err));
                          done(err);
                        } else {
                          expect(doc.name).to.be.equal('Gold');
                          expect(doc.startingPrice).to.be.equal(1000);
                          expect(doc.dayData).to.be.length(1);
                          expect(doc.dayData[0].price).to.be.approximately(1300, 400);
                          expect(doc.dayData[0].day).to.be.equal(moment().format('YYYY/MM/DD'));
                        }
                      });
                      Security.findById(leo.id, (err, doc) => {
                        if (err) {
                          debug(chalk.red(err));
                          done(err);
                        } else {
                          expect(doc.dayData).to.be.length(1);
                          expect(doc.dayData[0].price).to.be.approximately(40, 100);
                          expect(doc.dayData[0].day).to.be.equal(moment().format('YYYY/MM/DD'));
                        }
                      });
                      Security.findById(thq.id, (err, doc) => {
                        if (err) {
                          debug(chalk.red(err));
                          done(err);
                        } else {
                          expect(doc.dayData).to.be.length(1);
                          expect(doc.dayData[0].price).to.be.approximately(150, 100);
                          expect(doc.dayData[0].day).to.be.equal(moment().format('YYYY/MM/DD'));
                        }
                      });
                      Security.findById(us.id, (err, doc) => {
                        if (err) {
                          debug(chalk.red(err));
                          done(err);
                        } else {
                          expect(doc.name).to.be.equal('USD/SEK');
                          expect(doc.dayData).to.be.length(1);
                          expect(doc.dayData[0].price).to.be.approximately(9, 2);
                          expect(doc.dayData[0].day).to.be.equal(moment().format('YYYY/MM/DD'));
                        }
                      });
                      await secAfterClose.update();
                      Security.findById(gold.id, (err, doc) => {
                        if (err) {
                          debug(chalk.red(err));
                          done(err);
                        } else {
                          expect(doc.name).to.be.equal('Gold');
                          expect(doc.startingPrice).to.be.equal(1000);
                          expect(doc.dayData).to.be.length(2);
                          expect(doc.dayData[0].price).to.be.approximately(1300, 400);
                          expect(doc.dayData[0].day).to.be.equal(moment().format('YYYY/MM/DD'));
                        }
                      });
                      Security.findById(leo.id, (err, doc) => {
                        if (err) {
                          debug(chalk.red(err));
                          done(err);
                        } else {
                          expect(doc.dayData).to.be.length(2);
                        }
                      });
                      Security.findById(thq.id, (err, doc) => {
                        if (err) {
                          debug(chalk.red(err));
                          done(err);
                        } else {
                          expect(doc.dayData).to.be.length(2);
                        }
                      });
                      Security.findById(us.id, (err, doc) => {
                        if (err) {
                          debug(chalk.red(err));
                          done(err);
                        } else {
                          expect(doc.name).to.be.equal('USD/SEK');
                          expect(doc.dayData[0].price).to.be.approximately(9, 2);
                          done();
                        }
                      });
                    });
                });
            });
        });
    });
  });
});
