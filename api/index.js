const app = require('./config/express-config');
const getEnv = require('./utils/functions/getEnv');

app.listen(getEnv('PORT'), () => {
  console.log("API listening on port " + getEnv('PORT') + "...");
});