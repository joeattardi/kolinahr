const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jwt-simple');

const config = require('../conf/config.json');
const webpackConfig = require('../webpack.config');
const apiRouter = require('./routers/apiRouter');
const socketServer = require('./socketServer');
const logger = require('./logger');
require('./auth');

const port = config.port || 3000;

const app = express();

mongoose.Promise = Promise;
mongoose.connect(config.mongoDbUri)
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

app.get('/auth', passport.authenticate('openidconnect', { scope: 'openid email profile' }));
app.get('/auth/callback', passport.authenticate('openidconnect',
  { session: false }), (req, res) => {
    const token = jwt.encode({ iat: Date.now(), sub: req.user._id }, config.jwtSecret);
    res.redirect(`/?token=${token}`);
  });

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'public', 'index.html'));
});

const server = http.createServer(app);
socketServer.init(server);
server.listen(port, () => {
  logger.info(`Kolinahr listening on port ${port} (http)`);
});

if (config.ssl && config.ssl.port && config.ssl.key && config.ssl.cert) {
  https.createServer({
    key: fs.readFileSync(config.ssl.key),
    cert: fs.readFileSync(config.ssl.cert),
    passphrase: config.ssl.passphrase
  }, app).listen(config.ssl.port, () => {
    logger.info(`Kolinahr listening on port ${config.ssl.port} (https)`);
  });
}

