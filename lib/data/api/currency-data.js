const stockData = require('stock-data.js');
const format = require('./formatters/currency-gold-formatter');

const API_KEY = process.env.DATA_KEY;

exports.currencyRate = (from, to) => new Promise((resolve, reject) => {
  stockData.forex.realtime({
    base: from,
    API_TOKEN: API_KEY,
  })
    .then((response) => {
      if (!response.data || !response.data[to]) {
        reject(new Error('Incorrect currency pair'));
      }
      resolve(format.format(`${from}/${to}`, Number(response.data[to])));
    })
    .catch((error) => {
      reject(error);
    });
});
