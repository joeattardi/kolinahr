const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: String,
  name: String,
  picture: String,
  email: String
});

module.exports = mongoose.model('User', userSchema);
