import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: 'info', // Set log level (can be 'info', 'warn', 'error', 'debug', etc.)
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamps
        format.printf(({ timestamp, level, message, ...meta }) => {
            let log = `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
            if (Object.keys(meta).length) {
                log += ` ${JSON.stringify(meta)}`;
            }
            return log;
        })
    ),
    transports: [
        new transports.Console(), // Log to the console
        new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to file
        new transports.File({ filename: 'logs/combined.log' }), // Log all levels to file
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        })
    );
}

export default logger;
