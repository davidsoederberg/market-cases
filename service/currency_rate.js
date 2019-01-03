const request = require('request');

const accessData = 'Realtime Currency Exchange Rate';
const accessRate = '5. Exchange Rate';

exports.currencyRate = (from, to) => new Promise((resolve, reject) => {
  const uri = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from.toUpperCase()}&to_currency=${to.toUpperCase()}&apikey=Y158OLPA7TBTTJW2`;
  request({ url: uri, json: true }, (error, response, body) => {
    if (error) {
      reject(error);
    }
    if (!body[accessData]) {
      reject(new Error('Incorrect currency pair'));
    } else {
      resolve(body[accessData][accessRate]);
    }
  });
});
