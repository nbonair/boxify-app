// @ts-nocheck
import winston from 'winston';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const logDirectory = path.join(process.cwd(), 'logs');

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define logging format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  })
);

// Define transports
const transports = [
  new winston.transports.Console({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      logFormat
    ),
  }),
  new winston.transports.File({
    filename: path.join(logDirectory, 'server.log'),
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
  }),
];

if (process.env.ENABLE_AWS_LOGGING === 'true') {
  transports.push(
    new winston.transports.Console({
      level: 'info',
      format: winston.format.json(),
    })
  );
}

const logger = winston.createLogger({
  levels: logLevels,
  format: logFormat,
  transports,
});

logger.stream = {
  write: (message) => logger.http(message.trim()),
};

export default logger;
