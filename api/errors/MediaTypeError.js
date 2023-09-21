/**
 * Um arquivo sendo enviado apresenta uma extensão inválida
 */
class MediaTypeError extends Error {
    constructor(msg) {
      super(msg);
      this.name = 'MediaTypeError';
    }
  }
  
module.exports = MediaTypeError;