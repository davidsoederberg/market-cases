const stockData = require('stock-data.js');
const request = require('request');
const delayFormat = require('./formatters/delay-formatter');
const realtimeFormat = require('./formatters/realtime-formatter');

const API_KEY = process.env.DATA_KEY;

exports.realTime = symbolsArray => new Promise((resolve, reject) => {
  stockData.realtime({
    symbols: symbolsArray,
    API_TOKEN: API_KEY,
  })
    .then((response) => {
      const formattedData = [];
      response.data.forEach((stock) => {
        formattedData.push(realtimeFormat.format(stock));
      });
      resolve(formattedData);
    })
    .catch((error) => {
      reject(error);
    });
});

exports.delay = symbol => new Promise((resolve, reject) => {
  request({ url: process.env.URL_API + symbol, json: true }, (error, response, body) => {
    if (error) {
      reject(error);
    } else {
      if (body.totalNumberOfHits === 0) {
        reject(new Error('Invalid symbol'));
      }
      const stock = body.hits[0].topHits[0];
      resolve(delayFormat.format(stock));
    }
  });
});
