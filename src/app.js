const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config.js');

const authRouter = require('./auth/auth-router');
const cardsRouter = require('./cards/cards-router');
const decksRouter = require('./decks/decks-router');
const usersRouter = require('./users/users-router');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

app.use('/api/auth', authRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/decks', decksRouter);
app.use('/api/users', usersRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.log('error in router');
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
