const debug = require('debug')('b-rscase:userController.js');
const chalk = require('chalk');
const User = require('../../models/user');
const Securities = require('../../models/securities');

exports.apiGet = (req, res) => {
  User.find({}, (error, docs) => {
    if (error) {
      debug(chalk.red(error));
      res.status(400).end();
    } else {
      debug('%o', docs);
      res.send(docs);
    }
  });
};

exports.apiGetOne = (req, res) => {
  User.findOne({ _id: req.params.id }, (error, doc) => {
    if (error) {
      debug(chalk.red(error));
      res.status(400).end();
    } else {
      debug('%o', doc);
      res.send(doc);
    }
  });
};

exports.apiPost = (req, res) => {
  const newUser = new User();
  newUser.name = req.body.name;

  newUser.save((error, doc) => {
    if (error) {
      debug(chalk.red(error));
      res.status(400).end();
    } else {
      debug('%o', doc);
      res.send(doc);
    }
  });
};

exports.apiUpdateCases = (req, res) => {
  Securities.findOne({ _id: req.body.caseID }, (error, sec) => {
    if (error) {
      debug(chalk.red(error));
      res.status(400).end();
    } else {
      User.findOneAndUpdate({ _id: req.params.id },
        { $push: { cases: { case: sec, long: req.body.long } } },
        { upsert: true, new: true }, (err, doc) => {
          if (err) {
            debug(chalk.red(error));
            res.status(400).end();
          } else {
            debug('%o', doc);
            res.send(doc);
          }
        });
    }
  });
};
