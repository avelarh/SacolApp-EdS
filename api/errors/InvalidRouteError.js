/**
 * Caso uma rota inválida ou inapropriada esteja sendo acessada.
 */
 class InvalidRouteError extends Error {
   constructor(msg) {
     super(msg);
     this.name = 'InvalidRouteError';
   }
 }
 
 module.exports = InvalidRouteError;