const cron = require('node-cron');
const debug = require('debug')('b-rscase:cron:intraday');
const moment = require('moment');
const securitiesUpdate = require('../data/update/securities/after-close');
const userUpdate = require('../data/update/users/after-close');

exports.start = () => {
  cron.schedule('50 22 * * 1-5', async () => {
    await securitiesUpdate.update();
    await userUpdate.update();
    debug(`${moment().format('YYYY/MM/D HH:mm:ss')} - after-close cron done.`);
  }, {
    timezone: 'Europe/Stockholm',
  });
};
