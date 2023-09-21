require('dotenv').config();
const path = require('path');

const express = require('express');
const app = express();

const cors = require('cors');
const getEnv = require('../utils/functions/getEnv');
app.use(cors(
  {
  origin: getEnv('APP_URL'),
  credentials: true
  }
));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

const usersRouter = require('../src/domains/users/controllers/index');
app.use('/api/users', usersRouter);

const productsRouter = require('../src/domains/products/controllers/index');
app.use('/api/products', productsRouter);

module.exports = app;