exports.format = data => ({
  name: data.name,
  price: data.lastPrice,
  changePercent: data.changePercent,
  symbol: data.tickerSymbol,
});
