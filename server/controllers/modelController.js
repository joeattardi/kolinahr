const LogicModel = require('../models/LogicModel');

function handleError(res, err) {
  res.status(500).json({
    result: 'error',
    message: err.message
  });
}

function createModel(req, res) {
  if (!req.body.title) {
    res.status(400).json({
      result: 'error',
      message: 'title is required'
    });
  } else {
    const model = new LogicModel(req.body);
    const now = new Date();
    model.created = now;
    model.updated = now;
    model.save(err => {
      if (err) {
        handleError(res, err);
      } else {
        res.status(201).send(model);
      }
    });
  }
}

function deleteModel(req, res) {
  LogicModel.findById(req.params.modelId, (err, model) => {
    if (err) {
      handleError(res, err);
    } else {
      if (model) {
        model.remove(removeErr => {
          if (err) {
            handleError(res, removeErr);
          } else {
            res.status(200).json({
              result: 'success',
              message: 'Model deleted'
            });
          }
        });
      } else {
        res.status(404).json({
          result: 'error',
          message: `Model not found with ID ${req.params.modelId}.`
        });
      }
    }
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
  const updatedModel = req.body;
  const id = req.params.modelId;

  LogicModel.findById(id, (err, model) => {
    if (err) {
      handleError(res, err);
    } else {
      if (model) {
        model.title = updatedModel.title;
        model.cards = updatedModel.cards;
        model.updated = new Date();
        model.save(saveErr => {
          if (saveErr) {
            handleError(res, saveErr);
          } else {
            res.status(200).json({
              result: 'success',
              message: 'Model updated.'
            });
          }
        });
      } else {
        res.status(404).json({
          result: 'error',
          message: `Model not found with ID ${id}.`
        });
      }
    }
  });
}

module.exports = { deleteModel, createModel, getModels, getModel, updateModel };
