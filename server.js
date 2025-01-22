import * as http from 'node:http';
import app from './src/app.js';
import logger from './src/utils/logger.js';
import sequelize from './src/models/db.js';
import { runMigration } from './src/utils/runMigrations.js';

const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

(async function startServer() {
    try {
        await sequelize.authenticate();
        logger.info('Database connection established successfully');

        await runMigration();

        const server = http.createServer(app);

        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);

    } catch (error) {
        logger.error('Startup failed:', error);
        process.exit(1);
    }
})();



/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            logger.error(`HTTP server: ${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`HTTP server: ${bind} is occupied by another application`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = this.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

    logger.info(`HTTP server: Listening on ${bind}`);
}