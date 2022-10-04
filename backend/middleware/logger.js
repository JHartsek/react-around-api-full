const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: './logs/requests.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: './logs/errors.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
