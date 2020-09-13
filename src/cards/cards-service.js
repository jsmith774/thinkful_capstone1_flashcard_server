const CardsService = {
  getAll(db) {
    return db.select('*').from('flashcard');
  },

  findCardsByDeckId(db, deckId) {
    return db
      .select('fc.id', 'fc.card_prompt', 'fc.card_answer')
      .from('flashcard as fc')
      .join('deck_flashcard_link as dfl', 'dfl.flashcard_id_fk', 'fc.id')
      .where('dfl.deck_id_fk', '=', deckId);
  },
};

module.exports = CardsService;
