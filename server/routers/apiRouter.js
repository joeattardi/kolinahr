const express = require('express');
const modelController = require('../controllers/modelController');
const userController = require('../controllers/userController');
const passport = require('passport');
const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/user', requireAuth, userController.getUser);
router.get('/models', requireAuth, modelController.getModels);
router.post('/models', requireAuth, modelController.createModel);
router.post('/models/:modelId', requireAuth, modelController.copyModel);
router.get('/models/:modelId', requireAuth, modelController.getModel);
router.delete('/models/:modelId', requireAuth, modelController.deleteModel);
router.put('/models/:modelId', requireAuth, modelController.updateModel);

module.exports = router;
