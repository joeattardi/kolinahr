const winston = require('winston');
const LogicModel = require('../models/LogicModel');

function handleError(res, err) {
  res.status(500).json({
    result: 'error',
    message: err.message
  });
}

function getModels(req, res) {
  LogicModel.find({}, 'title', (err, result) => {
    if (err) {
      handleError(res, err);
    } else {
      res.json(result);
    }
  });
}

function getModel(req, res) {
  LogicModel.findById(req.params.modelId, (err, model) => {
    if (err) {
      handleError(res, err);
    } else {
      if (model) {
        res.json(model);
      } else {
        res.status(404).json({
          result: 'error',
          message: `Model not found with ID ${req.params.modelId}.`
        });
      }
    }
  });
}

function updateModel(req, res) {
  const model = req.body;
  LogicModel.update({}, model, {}, err => {
    if (err) {
      handleError(res, err);
    }
  });
  res.json({
    result: 'success'
  });
}

module.exports = { getModels, getModel, updateModel };
