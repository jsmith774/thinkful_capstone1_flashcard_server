CREATE TABLE flashcard (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  card_prompt TEXT NOT NULL UNIQUE,
  card_answer TEXT NOT NULL
);

CREATE TABLE deck (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  deck_name TEXT NOT NULL UNIQUE
);

CREATE TABLE deck_flashcard_link (
  deck_id_fk INTEGER REFERENCES deck(id) ON DELETE CASCADE NOT NULL,
  flashcard_id_fk INTEGER REFERENCES flashcard(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (deck_id_fk, flashcard_id_fk)   
);

CREATE INDEX idx_deck_flashcard_link_deck_id
  ON deck_flashcard_link(deck_id_fk);

CREATE TABLE user_deck_link (
  user_id_fk INTEGER REFERENCES registered_user(id) ON DELETE CASCADE NOT NULL,
  deck_id_fk INTEGER REFERENCES deck(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (user_id_fk, deck_id_fk)
);

CREATE INDEX idx_user_deck_link_user_id
  ON user_deck_link(user_id_fk);