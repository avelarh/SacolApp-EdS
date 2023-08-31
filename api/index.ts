import { app } from './config/express-config';

app.listen(3030, () => {
  console.log("API listening on port 3030");
});