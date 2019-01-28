const debug = require('debug')('b-rscase:cron:securities:intraday.js');
const chalk = require('chalk');
const moment = require('moment');
const update = require('./update-prices');

exports.update = async () => {
  const securities = await update.getSecurities();
  const data = await update.getData(securities);
  debug(chalk.red(JSON.stringify(data)));
  /* eslint no-restricted-syntax:0 */
  for (const security of securities) {
    debug(chalk.cyan(security));
    const updateData = data.filter(({ symbol }) => symbol === security.symbol)[0];
    security.intradayData.push({ price: updateData.price, time: moment().format('HH:mm') });
    /* eslint no-await-in-loop:0 */
    await security.save();
  }
  debug(`${moment().format('YYYY/MM/DD HH:mm:ss')} - Update of intraday prices done.`);
};
