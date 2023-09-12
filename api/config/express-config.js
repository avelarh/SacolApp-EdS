require('dotenv').config();
const path = require('path');

const express = require('express');
const app = express();

const cors = require('cors');
const getEnv = require('../utils/getEnv');
const options = {
  origin: getEnv('APP_URL'),
  credentials: true
};
app.use(cors(options));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());