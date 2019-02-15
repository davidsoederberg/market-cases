const cron = require('node-cron');
const debug = require('debug')('b-rscase:cron:after-close');
const moment = require('moment');
const securitiesUpdate = require('../data/update/securities/after-close');
const userUpdate = require('../data/update/users/after-close');

exports.start = () => {
  cron.schedule('55 03 * * 2-6', async () => {
    await securitiesUpdate.update();
    await userUpdate.update();
    debug(`${moment().format('YYYY/MM/D HH:mm:ss')} - after-close cron done.`);
  }, {
    timezone: 'Europe/Stockholm',
  });
};
