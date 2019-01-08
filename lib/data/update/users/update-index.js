const debug = require('debug')('b-rscase:cron:update-index.js');
const chalk = require('chalk');
const Users = require('../../../../models/user');

exports.getSecurities = async () => new Promise((resolve, reject) => {
  Users.find({}, (err, users) => {
    if (err) {
      debug(chalk.red(err));
      reject(err);
    } else {
      resolve(users);
    }
  });
});
