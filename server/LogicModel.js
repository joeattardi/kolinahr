/* eslint-disable new-cap */
const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  id: String,
  text: String,
  color: String,
  column: String,
  links: [String]
});

const logicModelSchema = mongoose.Schema({
  title: String,
  cards: {
    inputs: [cardSchema],
    activities: [cardSchema],
    outputs: [cardSchema],
    outcomes: [cardSchema],
    impact: [cardSchema]
  }
});

module.exports = mongoose.model('LogicModel', logicModelSchema);