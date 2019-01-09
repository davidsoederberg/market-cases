const { expect } = require('chai');
const mongoose = require('mongoose');
const debug = require('debug')('b-rscase:test:update:securities:before-open.test.js');
const chalk = require('chalk');
const User = require('../../../models/user');
const userBeforeOpen = require('../../../lib/data/update/users/before-open');

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
  it('should reset intradayData', (done) => {
    const newUser = User({
      name: 'David',
      intradayData: [{ index: 100, time: 'test' }, { index: 1, time: 'test' }],
    });
    newUser.save()
      .then(async () => {
        expect(newUser.intradayData).to.be.length(2);
        await userBeforeOpen.reset();
        User.findById(newUser.id, (err, user) => {
          if (err) {
            done(err);
          } else {
            expect(user.dayData).to.be.length(0);
            done();
          }
        });
      });
  });
});
