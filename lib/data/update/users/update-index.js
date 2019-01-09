const debug = require('debug')('b-rscase:cron:update-index.js');
const chalk = require('chalk');
const Users = require('../../../../models/user');

exports.getUsers = async () => new Promise((resolve, reject) => {
  Users.find({})
    .populate('cases.case')
    .exec((err, docs) => {
      if (err) {
        debug(chalk.red(err));
        reject(err);
      } else {
        resolve(docs);
      }
    });
});

exports.formatDay = (cases) => {
  const data = [];
  cases.forEach((newCase) => {
    const newData = {
      startingPrice: newCase.case.startingPrice,
      long: newCase.long,
      price: newCase.case.dayData[newCase.case.dayData.length - 1].price,
    };
    data.push(newData);
  });
  return data;
};
