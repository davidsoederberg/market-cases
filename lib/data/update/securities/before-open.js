const debug = require('debug')('b-rscase:cron:securities:before-open.js');
const moment = require('moment');
const update = require('./update-prices');

exports.reset = async () => {
  const securities = await update.getSecurities();
  /* eslint no-restricted-syntax:0 */
  for (const security of securities) {
    security.intradayData = [];
    /* eslint no-await-in-loop:0 */
    await security.save();
  }
  debug(`${moment().format('YYYY/MM/DD HH:mm:ss')} - Reset of intraday prices done.`);
};
