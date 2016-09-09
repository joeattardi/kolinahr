const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  githubId: Number,
  name: String,
  avatarUrl: String
});

module.exports = mongoose.model('User', userSchema);
