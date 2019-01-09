/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const mongoose = require('mongoose');
const debug = require('debug')('b-rscase:test:database.test.js');
const chalk = require('chalk');
const User = require('../models/user');
const Security = require('../models/securities');

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
describe('database and models', () => {
  describe('user schema', () => {
    it('should save the user', (done) => {
      const David = new User({ name: 'David' });

      David.save()
        .then(() => {
          expect(David.isNew).to.be.false;
          done();
        });
    });

    it('should be an empty user collection', (done) => {
      User.find({}, (err, users) => {
        if (err) {
          done(err);
        } else {
          expect(users.length).to.be.equal(0);
          done();
        }
      });
    });

    it('should be invalid if name is empty', (done) => {
      const newUser = new User();
      newUser.validate((err) => {
        expect(err.errors.name).to.exist;
        done();
      });
    });

    it('should be valid if name is not empty', (done) => {
      const newUser = new User({ name: 'David' });
      newUser.validate((err) => {
        expect(err).to.be.null;
        done();
      });
    });
    it('should return empty dayData and intradayData as default', (done) => {
      const David = new User({ name: 'David' });

      David.save()
        .then(() => {
          expect(David.dayData).to.be.length(0);
          expect(David.intradayData).to.be.length(0);
          done();
        });
    });
    it('should return index dayData=100 and intradayData=1337', (done) => {
      const David = new User({ name: 'David' });
      David.dayData = [{ index: 100, day: '2100-01-01' }];
      David.intradayData = [{ index: 1337, time: '23:59' }];
      David.validate((err) => {
        expect(err).to.not.exist;
      });
      David.save()
        .then(() => {
          expect(David.dayData).to.be.length(1);
          expect(David.dayData[0].index).to.be.equal(100);
          expect(David.dayData[0].day).to.be.equal('2100-01-01');
          expect(David.intradayData).to.be.length(1);
          expect(David.intradayData[0].index).to.be.equal(1337);
          expect(David.intradayData[0].time).to.be.equal('23:59');
          done();
        });
    });
    it('should be invalid because dayData[i].index not provided', (done) => {
      const David = new User({ name: 'David' });
      David.dayData = [{ day: '2100-01-01' }];
      David.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid because dayData[i].day not provided', (done) => {
      const David = new User({ name: 'David' });
      David.dayData = [{ index: 100 }];
      David.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid because intraday[i].index not provided', (done) => {
      const David = new User({ name: 'David' });
      David.dayData = [{ time: '23:59' }];
      David.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid because intraday[i].time not provided', (done) => {
      const David = new User({ name: 'David' });
      David.intradayData = [{ index: 100 }];
      David.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
  });

  describe('securities schema', () => {
    it('should be invalid if everything is empty', (done) => {
      const newSec = new Security();
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid if symbol is empty', (done) => {
      const newSec = new Security({ name: 'name', startingPrice: 100, type: 2 });
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid if name is empty', (done) => {
      const newSec = new Security({ startingPrice: 100, type: 2 });
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid if type is empty', (done) => {
      const newSec = new Security({ name: 'Gold', startingPrice: 100 });
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid if startingPrice is empty', (done) => {
      const newSec = new Security({ name: 'Gold', type: 2 });
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be valid if name, type, startingPrice, symbol is not empty', (done) => {
      const newSec = new Security({ name: 'Gold', symbol: 'Gold' });
      newSec.startingPrice = 100;
      newSec.type = 2;
      newSec.validate((err) => {
        expect(err).to.be.null;
        done();
      });
    });
    it('should be invalid if type is higher than 3', (done) => {
      const newSec = new Security({
        name: 'Gold', startingPrice: 100, type: 4, symbol: 'Gold',
      });
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid if type is less than 0', (done) => {
      const newSec = new Security({
        name: 'Gold', startingPrice: 100, type: -1, symbol: 'Gold',
      });
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should return price dayData=100 and intradayData=1337', (done) => {
      const newSec = new Security({
        name: 'Gold', startingPrice: 100, type: 3, symbol: 'Gold',
      });
      newSec.dayData = [{ price: 100, day: '2100-01-01' }];
      newSec.intradayData = [{ price: 1337, time: '23:59' }];
      newSec.validate((err) => {
        expect(err).to.not.exist;
      });
      newSec.save()
        .then(() => {
          expect(newSec.dayData).to.be.length(1);
          expect(newSec.dayData[0].price).to.be.equal(100);
          expect(newSec.dayData[0].day).to.be.equal('2100-01-01');
          expect(newSec.intradayData).to.be.length(1);
          expect(newSec.intradayData[0].price).to.be.equal(1337);
          expect(newSec.intradayData[0].time).to.be.equal('23:59');
          done();
        });
    });
    it('should be invalid because dayData[i].price not provided', (done) => {
      const newSec = new Security({ name: 'Gold', startingPrice: 100, type: 3 });
      newSec.dayData = [{ day: '2100-01-01' }];
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid because dayData[i].day not provided', (done) => {
      const newSec = new Security({ name: 'Gold', startingPrice: 100, type: 3 });
      newSec.dayData = [{ price: 100 }];
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid because intraday[i].price not provided', (done) => {
      const newSec = new Security({ name: 'Gold', startingPrice: 100, type: 3 });
      newSec.dayData = [{ time: '23:59' }];
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid because intraday[i].time not provided', (done) => {
      const newSec = new Security({ name: 'Gold', startingPrice: 100, type: 3 });
      newSec.intradayData = [{ price: 100 }];
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid because intraday[i].time not provided', (done) => {
      const newSec = new Security({ name: 'Gold', startingPrice: 100, type: 3 });
      newSec.intradayData = [{ price: 100 }];
      newSec.dayData = [{ price: 100, day: '2100-01-01' }];
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should return index dayData=100 and intradayData=1337', (done) => {
      const newSec = new Security({ name: 'Gold', startingPrice: 100, type: 3 });
      newSec.dayData = [{ index: 100, day: '2100-01-01' }];
      newSec.intradayData = [{ index: 1337, time: '23:59' }];
      newSec.validate((err) => {
        expect(err).to.not.exist;
      });
      newSec.save()
        .then(() => {
          expect(newSec.dayData).to.be.length(1);
          expect(newSec.dayData[0].index).to.be.equal(100);
          expect(newSec.dayData[0].day).to.be.equal('2100-01-01');
          expect(newSec.intradayData).to.be.length(1);
          expect(newSec.intradayData[0].index).to.be.equal(1337);
          expect(newSec.intradayData[0].time).to.be.equal('23:59');
          done();
        });
    });
    it('should be invalid because dayData[i].index not provided', (done) => {
      const newSec = new Security({ name: 'Gold', startingPrice: 100, type: 3 });
      newSec.dayData = [{ day: '2100-01-01' }];
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid because dayData[i].day not provided', (done) => {
      const newSec = new Security({ name: 'Gold', startingPrice: 100, type: 3 });
      newSec.dayData = [{ index: 100 }];
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid because intraday[i].index not provided', (done) => {
      const newSec = new Security({ name: 'Gold', startingPrice: 100, type: 3 });
      newSec.dayData = [{ time: '23:59' }];
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid because intraday[i].time not provided', (done) => {
      const newSec = new Security({ name: 'Gold', startingPrice: 100, type: 3 });
      newSec.intradayData = [{ index: 100 }];
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid because intraday[i].time not provided', (done) => {
      const newSec = new Security({ name: 'Gold', startingPrice: 100, type: 3 });
      newSec.intradayData = [{ index: 100 }];
      newSec.dayData = [{ index: 100, day: '2100-01-01' }];
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
  });
});
