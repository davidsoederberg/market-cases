const cron = require('node-cron');
const debug = require('debug')('b-rscase:cron:intraday');
const moment = require('moment');
const securitiesUpdate = require('../data/update/securities/intraday');
const userUpdate = require('../data/update/users/intraday');

exports.start = () => {
  cron.schedule('*/1 9-22 * * 1-5', async () => {
    await securitiesUpdate.update();
    await userUpdate.update();
    debug(`${moment().format('YYYY/MM/D HH:mm:ss')} - intraday cron done.`);
  }, {
    timezone: 'Europe/Stockholm',
  });
};
