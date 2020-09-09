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
    const { deck_name } = req.body;
    const newDeck = { deck_name };

    for (const [key, value] of Object.entries(newDeck))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`,
        });
    res
      .status(201)
      .json({ deck_name: deck_name, deck_id: 'from db when called/created' });
  });

module.exports = decksRouter;
