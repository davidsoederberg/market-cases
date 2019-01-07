/* eslint-disable no-unused-expressions */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const chai = require('chai');
const chatHttp = require('chai-http');
const mongoose = require('mongoose');
const debug = require('debug')('b-rscase:test:user-test.js');
const chalk = require('chalk');
// const User = require('../../models/user');
const Security = require('../../models/securities');
const server = require('../../bin/www');

chai.use(chatHttp);
const { expect } = chai;

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

describe('api-securities-route testing', () => {
  describe('GET /sec', () => {
    it('should return 200 and an empty body', (done) => {
      chai.request(server)
        .get('/api/sec')
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).to.be.status(200);
            expect(res.body).to.be.length(0);
            done();
          }
        });
    });
    it('should return 200 and an non-empty body', (done) => {
      const newSec = new Security();
      newSec.name = 'Gold';
      newSec.startingPrice = 100;
      newSec.type = 2;
      newSec.symbol = 'Gold';
      newSec.save()
        .then(() => {
          chai.request(server)
            .get('/api/sec')
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                expect(res).to.be.status(200);
                expect(res.body).to.not.be.length(0);
                done();
              }
            });
        });
    });
  });
  describe('POST /sec', () => {
    it('should return status 200 because valid body provided', (done) => {
      chai.request(server)
        .post('/api/sec')
        .send({
          name: 'Gold', startingPrice: 100, type: 2, symbol: 'Gold',
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).to.be.status(200);
            expect(res.body.name).to.be.equal('Gold');
            expect(res.body.type).to.be.equal(2);
            expect(res.body.startingPrice).to.be.equal(100);
            done();
          }
        });
    });
    it('should return status 400 because no type, symbol provided', (done) => {
      chai.request(server)
        .post('/api/sec')
        .send({ name: 'Gold', startingPrice: 100 })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).to.be.status(400);
            done();
          }
        });
    });
    it('should return status 400 because no startingPrice, symbol provided', (done) => {
      chai.request(server)
        .post('/api/sec')
        .send({ name: 'Gold', type: 2 })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).to.be.status(400);
            done();
          }
        });
    });
    it('should return status 400 because no name, symbol provided', (done) => {
      chai.request(server)
        .post('/api/sec')
        .send({ type: 2, startingPrice: 100 })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).to.be.status(400);
            done();
          }
        });
    });
    it('should return status 400 because empty body', (done) => {
      chai.request(server)
        .post('/api/sec')
        .send({})
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).to.be.status(400);
            done();
          }
        });
    });
    it('should return status 400 because type is above 3', (done) => {
      chai.request(server)
        .post('/api/sec')
        .send({
          name: 'Gold', startingPrice: 100, type: 4, symbol: 'Gold',
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).to.be.status(400);
            done();
          }
        });
    });
  });
  describe('GET /sec/:id', () => {
    it('should return status 200 because a valid id is provided', (done) => {
      const newSec = new Security();
      newSec.name = 'Gold';
      newSec.startingPrice = 100;
      newSec.type = 2;
      newSec.symbol = 'Gold';
      newSec.save()
        .then(() => {
          chai.request(server)
            .get(`/api/sec/${newSec.id}`)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                expect(res).to.be.status(200);
                expect(res.body.name).to.be.equal('Gold');
                done();
              }
            });
        });
    });
    it('should return status 400 because an invalid id is provided', (done) => {
      chai.request(server)
        .get('/api/sec/123')
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).to.be.status(400);
            done();
          }
        });
    });
  });
});
