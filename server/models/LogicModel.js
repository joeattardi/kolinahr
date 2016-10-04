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
  private: Boolean,
  created: Date,
  createdBy: { type: String, ref: 'User' },
  updated: Date,
  updatedBy: { type: String, ref: 'User' },
  cards: {
    inputs: [cardSchema],
    activities: [cardSchema],
    outputs: [cardSchema],
    outcomes: [cardSchema],
    impact: [cardSchema]
  }
});

module.exports = mongoose.model('LogicModel', logicModelSchema);
