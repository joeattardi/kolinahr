const LogicModel = require('../models/LogicModel');

function getModel(req, res) {
  LogicModel.findOne({}, (err, model) => {
    if (err) {
      console.error(`Failed to load logic model: ${err.message}`);
      res.status(500).json({
        result: 'error',
        message: err.message
      });
    }
    res.json(model);
  });
}

function updateModel(req, res) {
  const model = req.body;
  LogicModel.update({}, model, {}, err => {
    if (err) {
      res.status(500).json({
        result: 'error',
        message: err.message
      });
    }
  });
  res.json({
    result: 'success'
  });
}

module.exports = { getModel, updateModel };
