/* eslint max-len:0 */
exports.percentage = (price, startingPrice) => Number((((price / startingPrice) - 1) * 100).toFixed(2));
