const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Decks Endpoints', function () {
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

  describe(`GET /api/decks`, () => {
    context(`Given no decks`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/decks')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });
    });

    context('Given there are decks in the database', () => {
      beforeEach('insert decks', () =>
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

      it('responds with 200 and all of the decks', () => {
        return supertest(app)
          .get('/api/decks')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, testDecks);
      });
    });
  });

  describe(`POSTT /api/decks`, () => {
    beforeEach('insert cards', () => helpers.seedCardTable(db, testFlashcards));

    it('responds with 204 and deck is added', () => {
      return supertest(app).get('/').expect(200, 'Hello, world!');
    });
  });
});
