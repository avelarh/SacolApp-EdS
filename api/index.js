const app = require('./config/express-config');
const getEnv = require('./utils/getEnv');

app.listen(3030, () => {
  console.log("API listening on port 3030");
});