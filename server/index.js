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

mongoose.connect(process.env.MONGODB_URI);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist/public'));
} else {
  winston.info('Running in development mode');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
}

app.use(bodyParser.json());

app.get('/model', modelController.getModel);
app.post('/model', modelController.updateModel);

app.listen(port, () => {
  winston.info(`Kolinahr listening on port ${port}`);
});

