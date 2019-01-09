// const Stocks = require('stocks.js');

// const stocks = new Stocks({ apiKey: process.env.apiKey });
// const INTERVAL = '1min';
// const AMOUNT = 1;

/* exports.realTimeSharePrice = async (ticker) => {
  const stock = await stocks.timeSeries({
    symbol: ticker,
    interval: INTERVAL,
    amount: AMOUNT,
  });
  return stock[0].close;
}; */
const request = require('request');
const debug = require('debug')('b-rscase:stock_price');
const chalk = require('chalk');
const delayFormat = require('./formatters/delay-formatter');
const realtimeFormat = require('./formatters/realtime-formatter');

const API_KEY = process.env.DATA_KEY;

exports.realTime = symbols => new Promise((resolve, reject) => {
  const symbolsString = symbols.join();
  const URI = `https://www.worldtradingdata.com/api/v1/stock?symbol=${symbolsString}&api_token=${API_KEY}`;
  request({ url: URI, json: true }, (error, response, body) => {
    if (error) {
      debug(chalk.red(error));
      reject(error);
    }
    if (!body.data) {
      reject(new Error('Invalid symbols'));
    }
    const formattedData = [];
    body.data.forEach((security) => {
      formattedData.push(realtimeFormat.format(security));
    });
    resolve(formattedData);
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
