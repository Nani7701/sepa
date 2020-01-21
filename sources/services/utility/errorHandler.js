module.exports = function CustomError(message, statusCode) {
  Error.captureStackTrace(this, this.constructor);
  //this.name = this.constructor.name;
  this.message = message;
  this.status = statusCode;
};

require('util').inherits(module.exports, Error);