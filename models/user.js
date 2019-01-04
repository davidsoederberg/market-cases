const mongoose = require('mongoose');

const { Schema } = mongoose;

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  cases: [{
    id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Securities',
    },
    long: {
      type: Boolean,
      default: true,
    },
  }],
  index: {
    type: Number,
    default: 100,
    required: true,
  },
});

const userModel = mongoose.model('User', user);
module.exports = userModel;
