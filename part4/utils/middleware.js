const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if(error.name === 'CastError' && error.kind === 'ObjectId'){
    return res.status(400).send({ error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError'){
    return res.status(401).json({ error: 'invalid token'});
  }
  return next(error);
};

const tokenExtractor = (req) => {
  const authorization = req.get('authorization');
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7);
  }
  return null;
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};
