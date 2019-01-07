const request = require('request');
const cheerio = require('cheerio');
const debug = require('debug')('b-rscase:gold-data.js');
const chalk = require('chalk');
const format = require('./formatters/currency-gold-formatter');

exports.goldprice = () => new Promise((resolve, reject) => {
  const uri = process.env.URL_GOLD;
  request(uri, (error, response, html) => {
    if (error) {
      debug(chalk.red(error));
      reject(error);
    } else {
      const $ = cheerio.load(html);
      const price = Number($('.price-ticket__price').text().substring(0, 7));
      resolve(format.format('Gold', price));
    }
  });
});
