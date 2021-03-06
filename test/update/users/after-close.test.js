const { expect } = require('chai');
const mongoose = require('mongoose');
const debug = require('debug')('b-rscase:test:update:securities:before-open.test.js');
const chalk = require('chalk');
const Security = require('../../../models/securities');
const User = require('../../../models/user');
const userAfterClose = require('../../../lib/data/update/users/after-close');

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

describe('users after-close update tests', () => {
  it('should return correct index inside dayData array', (done) => {
    const newSec1 = new Security({
      name: 'Gold', symbol: 'Gold', type: 2, startingPrice: 1500, dayData: [{ price: 1648, day: 'test' }],
    });
    const newSec2 = new Security({
      name: 'Gold', symbol: 'Gold', type: 2, startingPrice: 100, dayData: [{ price: 98, day: 'test' }],
    });
    const newSec3 = new Security({
      name: 'Gold', symbol: 'Gold', type: 2, startingPrice: 30, dayData: [{ price: 33, day: 'test' }],
    });
    newSec1.save()
      .then(() => {
        newSec2.save()
          .then(() => {
            newSec3.save()
              .then(() => {
                const newUser = User({
                  name: 'David',
                  cases: [
                    { case: newSec1.id, long: true },
                    { case: newSec2.id, long: false },
                    { case: newSec3.id, long: true },
                  ],
                });
                newUser.save()
                  .then(async () => {
                    expect(newUser.dayData).to.be.length(0);
                    await userAfterClose.update();
                    User.findById(newUser.id, (err, user) => {
                      if (err) {
                        done(err);
                      } else {
                        expect(user.dayData).to.be.length(1);
                        expect(user.dayData[0].index).to.be.equal(107.29);
                        done();
                      }
                    });
                  });
              });
          });
      });
  });
});
