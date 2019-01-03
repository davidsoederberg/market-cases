const request = require('request');
const cheerio = require('cheerio');

exports.goldprice = () => new Promise((resolve, reject) => {
  const uri = 'https://www.ig.com/se/ravaror/marknader-ravaror/avista-guld';
  request(uri, (error, response, html) => {
    if (error) {
      reject(error);
    } else {
      const $ = cheerio.load(html);
      resolve(Number($('.price-ticket__price').text().substring(0, 7)));
    }
  });
});
