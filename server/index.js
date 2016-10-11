const path = require('path');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jwt-simple');

const webpackConfig = require('../webpack.config');
const apiRouter = require('./routers/apiRouter');
const logger = require('./logger');
require('./auth');

const port = process.env.PORT || 3000;

const app = express();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    logger.debug('Connected to MongoDB');
  })
  .catch(err => {
    logger.error(`Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('dist', 'public')));
} else {
  logger.info('Running in development mode');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
}

app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/api', apiRouter);

app.get('/auth', passport.authenticate('openidconnect', { scope: 'openid email' }));
app.get('/auth/callback', passport.authenticate('openidconnect',
  { session: false }), (req, res) => {
    const token = jwt.encode({ iat: Date.now(), sub: req.user._id }, process.env.JWT_SECRET);
    res.redirect(`/?token=${token}`);
  });

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'public', 'index.html'));
});

app.listen(port, () => {
  logger.info(`Kolinahr listening on port ${port}`);
});

