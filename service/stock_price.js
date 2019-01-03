const Stocks = require('stocks.js');

const stocks = new Stocks({ apiKey: process.env.apiKey });
const INTERVAL = '1min';
const AMOUNT = 1;

exports.realTimeSharePrice = async (ticker) => {
  const stock = await stocks.timeSeries({
    symbol: ticker,
    interval: INTERVAL,
    amount: AMOUNT,
  });
  return stock[0].close;
};
