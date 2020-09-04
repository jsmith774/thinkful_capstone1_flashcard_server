const express = require('express');
const DecksService = require('./decks-service');

const decksRouter = express.Router();
const jsonBodyParser = express.json();

decksRouter
  .route('/')
  .get((req, res, next) => {
    console.log("in decksRouter.route('/').get()...");
    DecksService.getAll(req.app.get('db'))
      .then((decks) => {
        console.log(decks);
        return res.json(decks);
        //return res.json(decks.map(DecksService.serialize));
      })
      //.catch(next);
      .catch(() => {
        console.log(".then failed? db query didn't work?");
        return next;
      });
  })
  .post(jsonBodyParser, (req, res, next) => {
    //todo implement POST
    console.log('IMPLEMENT POST HERE');
    res.send(req.body);
  });

module.exports = decksRouter;
