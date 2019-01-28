const debug = require('debug')('b-rscase:cron:securities:after-close.js');
const moment = require('moment');
const update = require('./update-prices');

exports.update = async () => {
  const securities = await update.getSecurities();
  const data = await update.getData(securities);
  /* eslint no-restricted-syntax:0 */
  for (const security of securities) {
    const updateData = data.filter(({ symbol }) => symbol === security.symbol)[0];
    security.dayData.push({ price: updateData.price, day: moment().format('YYYY/MM/DD') });
    /* eslint no-await-in-loop:0 */
    await security.save();
  }
  debug(`${moment().subtract(1, 'days').format('YYYY/MM/DD HH:mm:ss')} - Update of daily prices done.`);
};
