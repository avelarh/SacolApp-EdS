const NotAuthorizedError = require('./NotAuthorizedError');

class PermissionError extends NotAuthorizedError {
  constructor(msg) {
    super(msg);
    this.name = 'PermissionError';
  }
}

module.exports = PermissionError;