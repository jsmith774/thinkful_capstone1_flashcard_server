const express = require('express');
const CardsService = require('./cards-service');

const cardsRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');

cardsRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    if (req.query.deckid) {
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
      })
      .catch(next);
  });

module.exports = cardsRouter;
