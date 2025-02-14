import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import logger from './utils/logger.js';

import createHttpError from 'http-errors';

import indexRouter from './routes/index.js'


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: logger.stream }));

app.use('/v1/api', indexRouter)

// Error Handling
app.use((req, res, next) => {
    next(createHttpError(404, `Could not ${req.method} resource '${req.originalUrl}'`));
});

app.use((err, req, res, next) => {
    logger.error(`${err.name}: ${err.message}\nStack: ${err.stack }`);
    res.status(err.status || 500).set(err.headers).json({
        status: err.status || 500,
        error: err.message || 'Internal Server Error',
    });
});


export default app;
