/*
* securities: {[
*  startingPrice: Number,
*  price: Number,
*  long: Boolean
* ]}
*/

exports.index = (securities) => {
  let index = 0;
  securities.forEach((sec) => {
    index += sec.long
      ? (sec.price / sec.startingPrice) * 100
      : 100 + (100 - (sec.price / sec.startingPrice) * 100);
  });
  return Number((index / securities.length).toFixed(2));
};
