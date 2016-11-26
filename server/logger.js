const fs = require('fs');
const winston = require('winston');
const config = require('../conf/config.json');

try {
  fs.statSync('logs');
} catch (err) {
  fs.mkdirSync('logs');
}

const logger = new (winston.Logger)({
  level: config.logLevel || 'info',
  transports: [
    new (winston.transports.Console)({ timestamp: true }),
    new (winston.transports.File)({ filename: 'logs/kolinahr.log', timestamp: true })
  ]
});

module.exports = logger;
