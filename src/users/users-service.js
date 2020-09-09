const xss = require('xss');

const UsersService = {
  getStudents(db) {
    return db
      .select('ru.id', 'ru.user_name', 'ru.full_name')
      .from('registered_user as ru')
      .join('user_role as ur', 'ur.id', 'ru.role_id_fk')
      .where('ur.role_name', '=', 'Student');
  },

  // findCardsByDeckId(db, deckId) {
  //   return db
  //     .select('*')
  //     .from('flashcard as fc')
  //     .join('deck_flashcard_link as dfl', 'dfl.flashcard_id_fk', 'fc.id')
  //     .where('dfl.deck_id_fk', '=', deckId);
  // },

  // serializeCard(card) {
  //   return {
  //     id: card.id,
  //     card_prompt: xss(card.card_prompt),
  //     card_answer: xss(card.card_answer), //todo make sure this doesn't break
  //   };
  // },
};

module.exports = UsersService;
