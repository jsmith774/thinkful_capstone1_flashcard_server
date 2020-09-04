const xss = require('xss');

const DecksService = {
  getAll(db) {
    return db.select('*').from('deck');
  },

  findByUserId(db, userId) {
    return db
      .select('*')
      .from('deck as d')
      .join('user_deck_link as udl', 'udl.deck_id_fk', 'd.id')
      .where('udl.user_id_fk', '=', userId);
  },
  // serializeCard(deck) {
  //   return {
  //        todo xss as needed
  //   };
  // },
};

module.exports = DecksService;
