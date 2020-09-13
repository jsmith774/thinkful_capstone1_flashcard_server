const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/************************************
 *
 *  TEST FIXTURES
 *
 ************************************/
function makeUserRolesArray() {
  return [
    {
      id: 1,
      role_name: 'Educator',
    },
    {
      id: 2,
      role_name: 'Student',
    },
  ];
}

function makeRegisteredUsersArray() {
  return [
    {
      id: 1,
      user_name: 'mrssmith',
      full_name: 'Mrs. Smith',
      password: 'mrssmith',
      role_id_fk: '1',
    },
    {
      id: 2,
      user_name: 'buttreflyinthesky',
      full_name: 'LeVar Burton',
      password: 'buttreflyinthesky',
      role_id_fk: '1',
    },
    {
      id: 3,
      user_name: 'scienceguy',
      full_name: 'Bill Nye',
      password: 'scienceguy',
      role_id_fk: '1',
    },
    {
      id: 4,
      user_name: 'liljohn',
      full_name: 'John Doe',
      password: 'liljohn',
      role_id_fk: '2',
    },
    {
      id: 5,
      user_name: 'plainjane',
      full_name: 'Jane Doe',
      password: 'plainjane',
      role_id_fk: '2',
    },
  ];
}

function makeFlashcardsArray() {
  return [
    {
      id: 1,
      card_prompt: 'all',
      card_answer: 'https://hhvstaffing.com/audio/all.mp3',
    },
    {
      id: 2,
      card_prompt: 'am',
      card_answer: 'https://hhvstaffing.com/audio/am.mp3',
    },
    {
      id: 3,
      card_prompt: 'and',
      card_answer: 'https://hhvstaffing.com/audio/and.mp3',
    },
    {
      id: 4,
      card_prompt: 'big',
      card_answer: 'https://hhvstaffing.com/audio/big.mp3',
    },
    {
      id: 5,
      card_prompt: 'can',
      card_answer: 'https://hhvstaffing.com/audio/can.mp3',
    },
    {
      id: 6,
      card_prompt: 'go',
      card_answer: 'https://hhvstaffing.com/audio/go.mp3',
    },
    {
      id: 7,
      card_prompt: 'me',
      card_answer: 'https://hhvstaffing.com/audio/me.mp3',
    },
    {
      id: 8,
      card_prompt: 'my',
      card_answer: 'https://hhvstaffing.com/audio/my.mp3',
    },
    {
      id: 9,
      card_prompt: 'no',
      card_answer: 'https://hhvstaffing.com/audio/no.mp3',
    },
    {
      id: 10,
      card_prompt: 'so',
      card_answer: 'https://hhvstaffing.com/audio/so.mp3',
    },
    {
      id: 11,
      card_prompt: 'we',
      card_answer: 'https://hhvstaffing.com/audio/we.mp3',
    },
    {
      id: 12,
      card_prompt: 'yes',
      card_answer: 'https://hhvstaffing.com/audio/yes.mp3',
    },
    {
      id: 13,
      card_prompt: 'you',
      card_answer: 'https://hhvstaffing.com/audio/you.mp3',
    },
  ];
}

function makeDecksArray() {
  return [
    {
      id: 1,
      deck_name: 'Long O (3 Cards)',
    },
    {
      id: 2,
      deck_name: 'All (13 Cards)',
    },
    {
      id: 3,
      deck_name: 'Starts with A (3 Cards)',
    },
  ];
}

function makeDeckCardLinkArray() {
  return [
    {
      deck_id_fk: 1,
      flashcard_id_fk: 6,
    },
    {
      deck_id_fk: 1,
      flashcard_id_fk: 9,
    },
    {
      deck_id_fk: 1,
      flashcard_id_fk: 10,
    },
    {
      deck_id_fk: 3,
      flashcard_id_fk: 1,
    },
    {
      deck_id_fk: 3,
      flashcard_id_fk: 2,
    },
    {
      deck_id_fk: 3,
      flashcard_id_fk: 3,
    },
  ];
}

function makeStudentDeckLinkArray() {
  return [
    {
      user_id_fk: 4,
      deck_id_fk: 1,
    },
    {
      user_id_fk: 5,
      deck_id_fk: 1,
    },
    {
      user_id_fk: 5,
      deck_id_fk: 2,
    },
    {
      user_id_fk: 5,
      deck_id_fk: 3,
    },
  ];
}

function makeTestFixtures() {
  const testRoles = makeUserRolesArray();
  const testUsers = makeRegisteredUsersArray();
  const testFlashcards = makeFlashcardsArray();
  const testDecks = makeDecksArray();
  const testDeckCardLinks = makeDeckCardLinkArray();
  const testStudentDeckLinks = makeStudentDeckLinkArray();
  return {
    testRoles,
    testUsers,
    testFlashcards,
    testDecks,
    testDeckCardLinks,
    testStudentDeckLinks,
  };
}

/************************************
 *
 *  DB CLEANING/SEEDING
 *
 ************************************/
function cleanTables(db) {
  return db
    .raw(
      `TRUNCATE
      user_deck_link,
      deck_flashcard_link,
      deck,
      flashcard,
      registered_user,
      user_role
    RESTART IDENTITY CASCADE`
    )
    .then(() => {});
}

function seedUsers(db, roles, users) {
  const hashedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));

  return db
    .insert(roles)
    .into('user_role')
    .then(() => {
      db.insert(hashedUsers)
        .into('registered_user')
        .then(() => {});
    });
}

function seedCardTable(db, flashcards) {
  return db
    .insert(flashcards)
    .into('flashcard')
    .then(() => {});
}

function seedDecks(db, decks, cards, students) {
  return db.transaction(async (trx) => {
    await seedDeckTable(trx, decks);
    await seedDeckFlashcardLink(trx, cards);
    await seedUserDeckLink(trx, students);
  });
}

function seedDeckTable(db, decks) {
  return db.insert(decks).into('deck');
}

function seedDeckFlashcardLink(db, deckCardLinks) {
  return db.insert(deckCardLinks).into('deck_flashcard_link');
}

function seedUserDeckLink(db, userDeckLinks) {
  return db.insert(userDeckLinks).into('user_deck_link');
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUserRolesArray,
  makeRegisteredUsersArray,
  makeFlashcardsArray,
  makeDecksArray,
  makeTestFixtures,
  cleanTables,
  makeAuthHeader,
  seedUsers,
  seedCardTable,
  seedDecks,
};
