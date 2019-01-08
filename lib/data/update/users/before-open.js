const debug = require('debug')('b-rscase:cron:securities:before-open.js');
const test = require('debug')('b-rscase:test:cron:securities:before-open.js');
const moment = require('moment');
const update = require('./update-index');

exports.reset = async () => {
  const users = await update.getSecurities();
  /* eslint no-restricted-syntax:0 */
  for (const user of users) {
    user.intradayData = [];
    /* eslint no-await-in-loop:0 */
    await user.save();
  }
  debug(`${moment().format('YYYY/MM/DD HH:mm:ss')} - Reset of intraday prices done.`);
  test(`${moment().format('YYYY/MM/DD HH:mm:ss')} - Reset of intraday prices done.`);
};
