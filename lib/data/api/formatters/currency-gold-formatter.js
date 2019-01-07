exports.format = (securityName, rate) => ({
  name: securityName,
  price: rate,
  symbol: securityName,
  changePercent: undefined,
});
