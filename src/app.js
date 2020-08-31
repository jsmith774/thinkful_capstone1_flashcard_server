require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config.js');

//todo for each entity 'xyz':
//todo     const xyzRouter = require('./xyx/xyz-router');
const sampleRouter = require('./sample/sample-router');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

//todo refactor routing out of app to use xyzRouter
//todo      remove direct routing from app
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

//todo for each entity:
//todo  use imported xyzRouter with common route path base
//todo     app.use('/v1/xyz');
app.use('/v1/sample', sampleRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
