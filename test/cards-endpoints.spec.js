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

  describe.only(`GET /api/cards`, () => {
    context(`Given no cards`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/cards')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });
    });

    context('Given there are cards in the database', () => {
      beforeEach('insert articles', () =>
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
        //cardsInDeck.push({ id: 763, card_prompt: 'test', card_answer: '42' });

        return supertest(app)
          .get('/api/cards?deckid=3')
          .set('Authorization', helpers.makeAuthHeader(testUsers[4]))
          .expect(200, cardsInDeck);
      });
    });

    // context(`Given an XSS attack article`, () => {
    //   const testUser = helpers.makeUsersArray()[1];
    //   const {
    //     maliciousArticle,
    //     expectedArticle,
    //   } = helpers.makeMaliciousArticle(testUser);

    //   beforeEach('insert malicious article', () => {
    //     return helpers.seedMaliciousArticle(db, testUser, maliciousArticle);
    //   });

    //   it('removes XSS attack content', () => {
    //     return supertest(app)
    //       .get(`/api/articles`)
    //       .expect(200)
    //       .expect((res) => {
    //         expect(res.body[0].title).to.eql(expectedArticle.title);
    //         expect(res.body[0].content).to.eql(expectedArticle.content);
    //       });
    //   });
    // });
  });
});
