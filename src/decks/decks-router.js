const express = require('express');
const DecksService = require('./decks-service');

const decksRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');

decksRouter
  .route('/')
  .all(requireAuth)
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
    const { deck_name } = req.body;
    const newDeck = { deck_name };

    for (const [key, value] of Object.entries(newDeck)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`,
        });
      }
    }

    DecksService.insertDeck(req.app.get('db'), newDeck)
      .then((deck) => {
        const deckId = deck.id;
        DecksService.addCards(req.app.get('db'), deckId, req.body.cards).then(
          () => {
            return;
          }
        );
        DecksService.addStudents(
          req.app.get('db'),
          deckId,
          req.body.students
        ).then(() => {
          return;
        });
        return res.status(201).json(deck.id);
      })
      .catch(next);
  });

module.exports = decksRouter;
