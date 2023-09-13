/**
 * Caso um usuário tente realizar uma ação proíbida, como acessar uma
 * determinada rota ou modificar um valor, devido a não ter uma função que
 * esteja autorizada para tal ação.
 */
 class NotAuthorizedError extends Error {
   constructor(msg) {
     super(msg);
     this.name = 'NotAuthorizedError';
   }
 }
 
 module.exports = NotAuthorizedError;