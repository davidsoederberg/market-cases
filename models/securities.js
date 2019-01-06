const mongoose = require('mongoose');

const { Schema } = mongoose;

const securities = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    // 0 stock - realtime
    // 1 stock - delay
    // 2 currency
    // 3 gold
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  dayData: [{
    index: {
      type: Number,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
  }],
  intradayData: [{
    index: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  }],
});

const securitiesModel = mongoose.model('Securities', securities);
module.exports = securitiesModel;
