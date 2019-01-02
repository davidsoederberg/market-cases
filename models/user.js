const mongoose = require('mongoose');
const securitiesSchema = require('./securities');

const { Schema } = mongoose;

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  cases: [securitiesSchema.schema],
  index: {
    type: Number,
    default: 0,
  },
});

const userModel = mongoose.model('User', user);
module.exports = userModel;
