const express = require('express');
const modelController = require('../controllers/modelController');
const router = express.Router();

router.get('/models', modelController.getModels);
router.post('/models', modelController.createModel);
router.post('/models/:modelId', modelController.copyModel);
router.get('/models/:modelId', modelController.getModel);
router.delete('/models/:modelId', modelController.deleteModel);
router.put('/models/:modelId', modelController.updateModel);

module.exports = router;
