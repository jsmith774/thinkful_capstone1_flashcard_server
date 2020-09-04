const express = require('express');
const CardsService = require('./cards-service');

const cardsRouter = express.Router();
const jsonBodyParser = express.json();

cardsRouter
  .route('/')
  .get((req, res, next) => {
    console.log("in cardsRouter.route('/').get()...");
    CardsService.getAll(req.app.get('db'))
      .then((cards) => {
        console.log(cards);
        return res.json(cards);
        //return res.json(cards.map(CardsService.serialize));
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

module.exports = cardsRouter;
