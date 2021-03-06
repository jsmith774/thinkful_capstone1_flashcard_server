const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Cards Endpoints', function () {
  let db;

  const {
    testRoles,
    testUsers,
    testFlashcards,
    testDecks,
    testDeckCardLinks,
    testStudentDeckLinks,
  } = helpers.makeTestFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  before('cleanup', () => helpers.cleanTables(db));
  beforeEach('load Users', () => helpers.seedUsers(db, testRoles, testUsers));

  afterEach('cleanup', () => helpers.cleanTables(db));

  after('disconnect from db', () => db.destroy());

  describe(`GET /api/cards`, () => {
    context(`Given no cards`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/cards')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });
    });

    context('Given there are cards in the database', () => {
      beforeEach('insert cards', () =>
        helpers.seedCardTable(db, testFlashcards)
      );
      beforeEach('insert decks', () =>
        helpers.seedDecks(
          db,
          testDecks,
          testDeckCardLinks,
          testStudentDeckLinks
        )
      );

      it('responds with 200 and all of the cards', () => {
        return supertest(app)
          .get('/api/cards')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, testFlashcards);
      });

      it('responds with 200 and only cards in requested deck', () => {
        const cardsInDeck = testFlashcards.filter((card) => {
          if (card.card_prompt.startsWith('a')) {
            return true;
          } else {
            return false;
          }
        });

        return supertest(app)
          .get('/api/cards?deckid=3')
          .set('Authorization', helpers.makeAuthHeader(testUsers[4]))
          .expect(200, cardsInDeck);
      });
    });
  });
});
