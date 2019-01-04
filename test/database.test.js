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
    it('should return 100 as default', (done) => {
      const David = new User({ name: 'David' });

      David.save()
        .then(() => {
          expect(David.index).to.be.equal(100);
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
    it('should be valid if name, type, startingPrice is not empty', (done) => {
      const newSec = new Security({ name: 'Gold' });
      newSec.startingPrice = 100;
      newSec.type = 2;
      newSec.validate((err) => {
        expect(err).to.be.null;
        done();
      });
    });
    it('should be invalid if type is higher than 2', (done) => {
      const newSec = new Security({ name: 'Gold', startingPrice: 100, type: 3 });
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
    it('should be invalid if type is less than 0', (done) => {
      const newSec = new Security({ name: 'Gold', startingPrice: 100, type: -1 });
      newSec.validate((err) => {
        expect(err).to.exist;
        done();
      });
    });
  });
});
