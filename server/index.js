const path = require('path');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const winston = require('winston');

const config = require('./config');
const webpackConfig = require('../webpack.config');
const modelController = require('./controllers/modelController');

const port = process.env.PORT || 3000;

const app = express();

winston.level = config.logLevel;

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    winston.info('Connected to MongoDB');
  })
  .catch(err => {
    winston.error(`Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('dist', 'public')));
} else {
  winston.info('Running in development mode');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
}

app.use(bodyParser.json());

app.get('/api/models', modelController.getModels);
app.post('/api/models', modelController.createModel);
app.post('/api/models/:modelId', modelController.copyModel);
app.get('/api/models/:modelId', modelController.getModel);
app.delete('/api/models/:modelId', modelController.deleteModel);
app.put('/api/models/:modelId', modelController.updateModel);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'public', 'index.html'));
});

app.listen(port, () => {
  winston.info(`Kolinahr listening on port ${port}`);
});

