const express = require('express');
const DecksService = require('./decks-service');

const decksRouter = express.Router();
const jsonBodyParser = express.json();

decksRouter
  .route('/')
  .get((req, res, next) => {
    if (req.query.userid) {
      return DecksService.findByUserId(
        req.app.get('db'),
        req.query.userid
      ).then((decks) => {
        return res.json(decks);
      });
    }
    return DecksService.getAll(req.app.get('db'))
      .then((decks) => {
        return res.json(decks);
        //return res.json(decks.map(DecksService.serialize));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    //todo implement POST
    console.log('IMPLEMENT POST HERE');
    res.send(req.body);
  });

module.exports = decksRouter;
