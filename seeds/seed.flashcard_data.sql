BEGIN;

TRUNCATE
  user_deck_link, deck_flashcard_link, deck, flashcard
  RESTART IDENTITY CASCADE;


INSERT INTO flashcard(card_prompt, card_answer)
VALUES
 ('go','https://hhvstaffing.com/audio/go.m4a'),
 ('bunny','https://hhvstaffing.com/audio/bunny.m4a'),
 ('go2','https://hhvstaffing.com/audio/go.m4a'),
 ('go3','https://hhvstaffing.com/audio/go.m4a'),
 ('go4','https://hhvstaffing.com/audio/go.m4a'),
 ('go5','https://hhvstaffing.com/audio/go.m4a'),
 ('go6','https://hhvstaffing.com/audio/go.m4a'),
 ('go7','https://hhvstaffing.com/audio/go.m4a'),
 ('go8','https://hhvstaffing.com/audio/go.m4a'),
 ('weirdsoundmp3','https://hhvstaffing.com/audio/here_you_go_lighter.mp3');


INSERT INTO deck(deck_name) 
VALUES
  ('Sight words - K Set1'),
  ('Sight words - K Set2'),
  ('Beginning rythym patterns'),
  ('Sight words - 1st');

 INSERT INTO deck_flashcard_link(deck_id_fk, flashcard_id_fk)
 VALUES
  (1,1),
  (1,2),
  (1,3),
  (1,4),
  (1,5),
  (1,6),
  (2,2),
  (2,3),
  (2,5),
  (2,7),
  (2,9),
  (3,1),
  (3,2),
  (4,1),
  (4,2),
  (4,5);

  INSERT INTO user_deck_link
  VALUES
    (5,1),
    (5,2),
    (4,4); 

COMMIT;
