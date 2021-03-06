const debug = require('debug')('b-rscase:cron:users:intraday.js');
const moment = require('moment');
const indexCalc = require('../../../calc/user-index');
const update = require('./update-index');

exports.update = async () => {
  const users = await update.getUsers();
  /* eslint no-restricted-syntax:0 */
  for (const user of users) {
    const newIndex = indexCalc.index(update.formatIntraday(user.cases));
    user.intradayData.push({ index: newIndex, time: moment().format('HH:mm') });
    /* eslint no-await-in-loop:0 */
    await user.save();
  }
  debug(`${moment().format('YYYY/MM/DD HH:mm:ss')} - Update of intraday index done.`);
};
