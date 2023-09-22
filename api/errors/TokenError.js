/**
 * Token de uma requisição não é mais válida ou não existe. Não abrange erros
 * partidos de um JWT.
 */
 class TokenError extends Error {
   constructor(msg) {
     super(msg);
     this.name = 'TokenError';
   }
 }
 
 module.exports = TokenError;