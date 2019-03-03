const request = require('request');
const cheerio = require('cheerio');
const format = require('./formatters/currency-gold-formatter');

const uri = process.env.URL_GOLD;

exports.goldprice = () => new Promise((resolve, reject) => {
  request(uri, (error, response, html) => {
    if (error) {
      reject(error);
    } else {
      const $ = cheerio.load(html);
      const price = Number($('.price-ticket__price').text().substring(0, 7));
      resolve(format.format('Gold', price));
    }
  });
});
