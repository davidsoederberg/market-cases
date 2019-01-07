const cron = require('node-cron');
const debug = require('debug')('b-rscase:cron:before-open');
const moment = require('moment');

exports.start = () => {
  cron.schedule('00 05 * * 1-5', () => {
    // PLACEHOLDER
    debug(moment().format('YYYY/MM/D HH:mm:ss'));
  }, {
    timezone: 'Europe/Stockholm',
  });
};
