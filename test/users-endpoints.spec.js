const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Users Endpoints', function () {
  let db;

  const { testRoles, testUsers } = helpers.makeTestFixtures();

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

  describe(`GET /students`, () => {
    it('responds with 200 and all users with role of Student', () => {
      const studentUsers = testUsers
        .filter((user) => user.role_id_fk === '2')
        .map((user) => {
          return {
            id: user.id,
            user_name: user.user_name,
            full_name: user.full_name,
          };
        });
      return supertest(app)
        .get('/api/users/students')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200, studentUsers);
    });
  });
});
