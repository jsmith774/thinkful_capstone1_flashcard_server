const express = require('express');
const CardsService = require('./cards-service');

const cardsRouter = express.Router();
const jsonBodyParser = express.json();

cardsRouter
  .route('/')
  .get((req, res, next) => {
    if (req.query.deckid) {
      //queryparms deckid and userid
      //todo verify that req.query.userid user has access to deckid and if so...
      return CardsService.findCardsByDeckId(
        req.app.get('db'),
        req.query.deckid
      ).then((cards) => {
        return res.json(cards);
      });
    }

    return CardsService.getAll(req.app.get('db'))
      .then((cards) => {
        return res.json(cards);
        //return res.json(cards.map(CardsService.serialize));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    //todo implement POST
    console.log('IMPLEMENT POST HERE');
    res.send(req.body);
  });

module.exports = cardsRouter;
