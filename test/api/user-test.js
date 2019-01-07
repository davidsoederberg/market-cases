/* eslint-disable no-unused-expressions */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const chai = require('chai');
const chatHttp = require('chai-http');
const mongoose = require('mongoose');
const debug = require('debug')('b-rscase:test:user-test.js');
const chalk = require('chalk');
const User = require('../../models/user');
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

describe('api-user-route testing', () => {
  describe('GET /user', () => {
    it('should return length 1', (done) => {
      const newUser = new User({ name: 'David' });
      newUser.save()
        .then(() => {
          expect(newUser.isNew).to.be.false;
          chai.request(server)
            .get('/api/user')
            .end((err, res) => {
              expect(res).to.be.status(200);
              expect(res).to.be.json;
              expect(res.body.length).to.be.equal(1);
              done();
            });
        });
    });
    it('should return status 200 and json', (done) => {
      chai.request(server)
        .get('/api/user')
        .end((err, res) => {
          expect(res).to.be.status(200);
          expect(res).to.be.json;
          expect(res.body.length).to.be.equal(0);
          done();
        });
    });
  });
  describe('GET /user/:id', () => {
    it('should return status 400 if ID is invalid', (done) => {
      chai.request(server)
        .get('/api/user/5c2e6b5a9642d814b8a5a6')
        .end((err, res) => {
          expect(res).to.be.status(400);
          done();
        });
    });
    it('should return status 200 if ID is valid', (done) => {
      const newUser = new User({ name: 'David' });
      newUser.save()
        .then(() => {
          expect(newUser.isNew).to.be.false;
          chai.request(server)
            .get(`/api/user/${newUser.id}`)
            .end((err, res) => {
              expect(res).to.be.status(200);
              expect(res).to.be.json;
              expect(res.body.name).to.be.equal('David');
              done();
            });
        });
    });
  });
  describe('POST /user', () => {
    it('should return status 200 because name is provided', (done) => {
      chai.request(server)
        .post('/api/user')
        .send({ name: 'David' })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.be.json;
          expect(res.body.name).to.be.equal('David');
          expect(res).to.be.status(200);
          done();
        });
    });
    it('should return status 400 because name is not provided', (done) => {
      chai.request(server)
        .post('/api/user')
        .send({})
        .end((err, res) => {
          expect(res).to.be.status(400);
          done();
        });
    });
  });
  describe('PUT /user/cases/:id', () => {
    it('should return status 200 because a valid securities id is provided (long = true)', (done) => {
      const newSec = new Security();
      newSec.name = 'Gold';
      newSec.startingPrice = 100;
      newSec.type = 2;
      newSec.symbol = 'Gold';
      newSec.save()
        .then(() => {
          const newUser = new User({ name: 'David' });
          newUser.save()
            .then(() => {
              chai.request(server)
                .put(`/api/user/cases/${newUser.id}`)
                .send({ caseID: newSec.id, long: true })
                .end((err, res) => {
                  expect(res).to.be.status(200);
                  expect(res.body.cases[0].id).to.be.equal(newSec.id);
                  expect(res.body.cases[0].long).to.be.true;
                  done();
                });
            });
        });
    });
    it('should return status 200 because a valid securities id is provided (long = false)', (done) => {
      const newSec = new Security();
      newSec.name = 'Gold';
      newSec.startingPrice = 100;
      newSec.type = 2;
      newSec.symbol = 'Gold';
      newSec.save()
        .then(() => {
          const newUser = new User({ name: 'David' });
          newUser.save()
            .then(() => {
              chai.request(server)
                .put(`/api/user/cases/${newUser.id}`)
                .send({ caseID: newSec.id, long: false })
                .end((err, res) => {
                  expect(res).to.be.status(200);
                  expect(res.body.cases[0].id).to.be.equal(newSec.id);
                  expect(res.body.cases[0].long).to.be.false;
                  done();
                });
            });
        });
    });
    it('should return status 400 because a valid securities id is not provided', (done) => {
      const newUser = new User({ name: 'David' });
      newUser.save()
        .then(() => {
          chai.request(server)
            .put(`/api/user/cases/${newUser.id}`)
            .send({ caseID: 123 })
            .end((err, res) => {
              expect(res).to.be.status(400);
              done();
            });
        });
    });
    it('should return status 400 because a valid user id is not provided', (done) => {
      const newSec = new Security();
      newSec.name = 'Gold';
      newSec.startingPrice = 100;
      newSec.type = 2;
      newSec.symbol = 'Gold';
      newSec.save()
        .then(() => {
          const newUser = new User({ name: 'David' });
          newUser.save()
            .then(() => {
              chai.request(server)
                .put('/api/user/cases/123')
                .send({ caseID: newSec.id })
                .end((err, res) => {
                  expect(res).to.be.status(400);
                  done();
                });
            });
        });
    });
  });
});
