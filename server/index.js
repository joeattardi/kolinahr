const path = require('path');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const winston = require('winston');
const passport = require('passport');
const jwt = require('jwt-simple');

const config = require('./config');
const webpackConfig = require('../webpack.config');
const apiRouter = require('./routers/apiRouter');
require('./auth');


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
app.use(passport.initialize());
app.use('/api', apiRouter);

app.get('/auth/github', passport.authenticate('github', { scope: 'openid email' }));
app.get('/auth/github/callback', passport.authenticate('github', {
  session: false, failureRedirect: '/login' }), (req, res) => {
    const token = jwt.encode({ iat: Date.now(), sub: req.user.githubId }, config.jwtSecret);
    res.redirect(`/?token=${token}`);
  });


app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'public', 'index.html'));
});

app.listen(port, () => {
  winston.info(`Kolinahr listening on port ${port}`);
});

