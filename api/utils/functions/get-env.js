function getEnv(name){
  const value = process.env[name];
  
  if (!value) {
    throw new Error(`Faltando: process.env['${name}'].`);
  }
  
  return value;
}

module.exports = getEnv;


