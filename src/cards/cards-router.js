const express = require('express');
const CardsService = require('./cards-service');

const cardsRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');

cardsRouter
  .route('/')
  .all(requireAuth)
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
  });

module.exports = cardsRouter;
