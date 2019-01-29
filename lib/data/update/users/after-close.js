const debug = require('debug')('b-rscase:cron:users:after-close.js');
const moment = require('moment');
const indexCalc = require('../../../calc/user-index');
const update = require('./update-index');

exports.update = async () => {
  const users = await update.getUsers();
  /* eslint no-restricted-syntax:0 */
  for (const user of users) {
    const newIndex = indexCalc.index(update.formatDay(user.cases));
    user.dayData.push({ index: newIndex, day: moment().subtract(1, 'days').format('YYYY/MM/DD') });
    /* eslint no-await-in-loop:0 */
    await user.save();
  }
  debug(`${moment().subtract(1, 'days').format('YYYY/MM/DD HH:mm:ss')} - Update of daily index done.`);
};
