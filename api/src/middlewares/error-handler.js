const NotAuthorizedError = require('../../errors/NotAuthorizedError');
const MediaTypeError = require('../../errors/MediaTypeError');
const InvalidParamError = require('../../errors/InvalidParamError');
const TokenError = require('../../errors/TokenError');
const QueryError = require('../../errors/QueryError');
const PermissionError = require('../../errors/PermissionError');
const InvalidRouteError = require('../../errors/InvalidRouteError');


function errorHandler(error, req, res, next) {
    let message = error.message;
    let status = 500; // Internal Server Error
  

    if ( error instanceof NotAuthorizedError) {
        status = 403; // Forbidden
    }
  
    if (error instanceof MediaTypeError) {
      status = 415; // Unsupported Media Type
    }
  
    if (error instanceof InvalidParamError) {
      status = 400; // Bad Request
    }
  
    if (error instanceof TokenError) {
      status = 404; // Not Found
    }
  
    if (error instanceof QueryError) {
      status = 406; // Not acceptable
    }

    if (error instanceof PermissionError) {
        status = 401; // Unauthorized
    }

    if (error instanceof InvalidRouteError) {
        status = 404; // Not Found
    }
  
    console.log(error);
    res.status(status).json(message);
}
  
module.exports = errorHandler;