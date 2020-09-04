const xss = require('xss');

const DecksService = {
  getAll(db) {
    return db.select('*').from('deck');
  },

  // serializeCard(deck) {
  //   return {
  //        todo xss as needed
  //   };
  // },
};

module.exports = DecksService;
