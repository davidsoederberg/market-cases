const mongoose = require('mongoose');

const { Schema } = mongoose;

const securities = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    // 0 stock
    // 1 currency
    // 2 gold
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  prices: [{
    date: String,
    price: Number,
  }],
});

const securitiesModel = mongoose.model('Securities', securities);
module.exports = securitiesModel;
