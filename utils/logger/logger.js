const winstonDailyRotateFile=require('winston-daily-rotate-file');
const winston = require('winston');

// Define your severity levels.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

// Define different colors for each level.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(colors)

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),

  // Tell Winston that the logs must be colored, commented because it caused formatting errors
  // winston.format.colorize({ all: true }),

  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(
    (info) => `Level: [${info.level}] TimeStamp:[${info.timestamp}] - Message: [${info.message}] \n`,
  ),
)

// Create the logger instance that has to be exported
// and used to log messages.
const logger = winston.loggers.add('customLogger', {
  format: format,
  transports:[
    //Print messages on the console
    new winston.transports.Console(),
    //Generating seprate error log files for each day
    new winstonDailyRotateFile({
      filename: './logs/%DATE%-error.log',
      datePattern:'DD-MM-YYYY',
    })
  ]
  

})

//Uncaught exceptions handler
winston.exceptions.handle(
  new winston.transports.File({ filename: './logs/exceptions.log' })
);

function DdumpError(source,err) {
  if (typeof err === 'object') {
    if (err.message) {
      logger.error(source+' :' , error.message);
    }
    if (err.stack) {
      console.log('\nStacktrace:')
      console.log('====================')
      logger.error(source+' :' + error.stack);
    }
  } else {
    console.log('dumpError :: argument is not an object');
  }
}

// try {
//   not_defined.function_call();
// } catch(err) {
//   dumpError(err);
// }
module.exports = logger