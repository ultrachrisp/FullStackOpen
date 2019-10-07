const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

mongoose.set('useFindAndModify', false);
logger.info('connecting to', config.MONGODB);

mongoose.connect(config.MONGODB, {useNewUrlParser: true})
    .then(() => logger.info('connected to MongoDB') )
    .catch(error => logger.error('error connecting to MongoDB:', error.message) );

const app = express();
app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
