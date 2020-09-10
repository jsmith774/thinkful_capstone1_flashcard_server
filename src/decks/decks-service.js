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

  insertDeck(db, newDeck) {
    return db
      .insert(newDeck)
      .into('deck')
      .returning('*')
      .then(([deck]) => deck)
      .then((deck) => deck);
  },

  addCards(db, deckId, cards) {
    console.log('ADD CARDS deckid:', deckId);
    const rows = cards.map((cardId) => ({
      deck_id_fk: deckId,
      flashcard_id_fk: cardId,
    }));

    return db.insert(rows).into('deck_flashcard_link');
  },

  addStudents(db, deckId, students) {
    console.log('ADD STUDENTS deckId:', deckId);
    const rows = students.map((studentId) => ({
      user_id_fk: studentId,
      deck_id_fk: deckId,
    }));

    return db.insert(rows).into('user_deck_link');
  },
  // return db
  //     .insert(newReview)
  //     .into('thingful_reviews')
  //     .returning('*')
  //     .then(([review]) => review)
  //     .then(review =>
  //       ReviewsService.getById(db, review.id)
  //     )

  // const { title, content, style } = req.body
  // +   const newArticle = { title, content, style }
  // +   ArticlesService.insertArticle(
  // +     req.app.get('db'),
  // +     newArticle
  // +   )
  // +     .then(article => {
  // +       res
  // +         .status(201)
  // +         .json(article)
  // +     })
  // +     .catch(next)

  // serializeCard(deck) {
  //   return {
  //        todo xss as needed
  //   };
  // },
};

module.exports = DecksService;
