/* eslint-disable no-unused-expressions */

const chai = require('chai');
const chatHttp = require('chai-http');
const mongoose = require('mongoose');
const User = require('../models/user');
// const Security = require('../models/securities');
const server = require('../bin/www');

chai.use(chatHttp);
const { expect } = chai;

before((done) => {
  mongoose.connect('mongodb://localhost/test_db', { useNewUrlParser: true });
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Error', error);
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

describe('api-route testing', () => {
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
});
