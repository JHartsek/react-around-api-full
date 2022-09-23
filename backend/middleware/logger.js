const winston = require('winston');
const expressWinston= require('express-winston');

const reqestLogger = expressWinston.logger({
    transports: [
        new winston.transports.File({ filename: 'requests.log' })
    ],
    format: winston.format.json(),
})

const errorLogger = expressWinston.logger({
    transports: [
        new winston.transports.File({ filename: 'errors.log' })
    ],
    format: winston.format.json(),
})

module.exports = {
    reqestLogger, 
    errorLogger
}