const winston = require('winston');

module.exports = () => { 
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.json(),
      winston.format.colorize()
    )
    ,
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.Console()
    ],
    });
  
    //
    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
  return logger  
}
