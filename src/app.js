const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const addRequestId = require('express-request-id')();
const config = require('config');
const errorHandler = require('./handlers/ErrorHandler');
const logger = require('./utils/logger');
const routes = require('./routes/index');

const app = express();

app.use(addRequestId);
app.use(bodyParser.json({
    extended: true,
}));

app.get('/health', (req, res) => {
    res.status(200).send();
});

morgan.token('id', req => req.id);

const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

app.use(morgan(loggerFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: process.stderr,
}));

app.use(morgan(loggerFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: process.stdout,
}));

app.use((req, res, next) => {
    logger.logRequest(req);
    next();
});

app.use('/api/swapi/v1/',
    routes);

app.use(errorHandler.notFound);

if (config.environment === 'development') {
    app.use(errorHandler.developmentErrors);
}

app.use(errorHandler.productionErrors);

module.exports = app;
