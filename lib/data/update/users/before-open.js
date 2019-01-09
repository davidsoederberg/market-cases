const debug = require('debug')('b-rscase:cron:users:before-open.js');
const moment = require('moment');
const update = require('./update-index');

exports.reset = async () => {
  const users = await update.getUsers();
  /* eslint no-restricted-syntax:0 */
  for (const user of users) {
    user.intradayData = [];
    /* eslint no-await-in-loop:0 */
    await user.save();
  }
  debug(`${moment().format('YYYY/MM/DD HH:mm:ss')} - Reset of intraday index done.`);
};
