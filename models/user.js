const mongoose = require('mongoose');

const { Schema } = mongoose;

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  cases: [{
    case: {
      type: mongoose.Schema.ObjectId,
      ref: 'Securities',
    },
    long: {
      type: Boolean,
      default: true,
    },
  }],
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

const userModel = mongoose.model('User', user);
module.exports = userModel;
