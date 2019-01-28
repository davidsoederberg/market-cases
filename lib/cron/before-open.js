const cron = require('node-cron');
const debug = require('debug')('b-rscase:cron:before-open');
const moment = require('moment');
const securitiesUpdate = require('../data/update/securities/before-open');
const userUpdate = require('../data/update/users/before-open');

exports.start = () => {
  cron.schedule('00 04 * * 1-5', async () => {
    await securitiesUpdate.reset();
    await userUpdate.reset();
    debug(`${moment().format('YYYY/MM/D HH:mm:ss')} - before-close cron done.`);
  }, {
    timezone: 'Europe/Stockholm',
  });
};
