const cron = require('node-cron');
const debug = require('debug')('b-rscase:cron:intraday');
const moment = require('moment');

exports.start = () => {
  cron.schedule('*/10 9-23 * * 1-5', () => {
    // PLACEHOLDER
    debug(moment().format('YYYY/MM/D HH:mm:ss'));
  }, {
    timezone: 'Europe/Stockholm',
  });
};
