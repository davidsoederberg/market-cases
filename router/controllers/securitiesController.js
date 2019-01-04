const debug = require('debug')('b-rscase:securitiesController.js');
const chalk = require('chalk');
const Securities = require('../../models/securities');

exports.apiGet = (req, res) => {
  Securities.find({}, (error, docs) => {
    if (error) {
      debug(chalk.red(error));
      res.end();
    } else {
      debug('%o', docs);
      res.send(docs);
    }
  });
};

exports.apiGetOne = (req, res) => {
  Securities.findOne({ _id: req.params.id }, (error, doc) => {
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
  const newSec = new Securities();
  newSec.name = req.body.name;
  newSec.type = req.body.type;
  newSec.startingPrice = req.body.startingPrice;
  newSec.save((error, doc) => {
    if (error) {
      debug(chalk.red(error));
      res.status(400).end();
    } else {
      debug('%o', doc);
      res.send(doc);
    }
  });
};

exports.apiUpdateNewPrice = (req, res) => {
  if (req.body.price) {
    const newPrice = {};
    const date = new Date();
    newPrice.date = `${date.getFullYear()} ${date.getMonth()} ${date.getDate()}`;
    newPrice.price = req.body.price;
    Securities.findOneAndUpdate({ _id: req.params.id },
      { $push: { prices: newPrice } }, { upsert: true, new: true }, (error, doc) => {
        if (error) {
          debug(chalk.red(error));
          res.status(400).end();
        } else {
          debug('%o', doc);
          res.send(doc);
        }
      });
  } else {
    debug(chalk.red('No price provided'));
    res.status(400).end();
  }
};
