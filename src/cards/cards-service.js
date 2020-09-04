const xss = require('xss');

const CardsService = {
  getAll(db) {
    return db.select('*').from('flashcard');
  },

  // serializeCard(card) {
  //   return {
  //     id: card.id,
  //     card_prompt: xss(card.card_prompt),
  //     card_answer: xss(card.card_answer), //todo make sure this doesn't break
  //   };
  // },
};

module.exports = CardsService;
