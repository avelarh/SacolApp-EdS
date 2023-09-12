/**
 * Dados informados para uma requisição no banco de dados são incompatíveis
 * ou inválidos.
 */
 class QueryError extends Error {
   constructor(msg) {
     super(msg);
     this.name = 'QueryError';
   }
 }
 
 module.exports = QueryError;