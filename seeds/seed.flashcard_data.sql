BEGIN;

TRUNCATE
  user_deck_link, deck_flashcard_link, deck, flashcard
  RESTART IDENTITY CASCADE;


INSERT INTO flashcard(card_prompt, card_answer)
VALUES
 ('all','https://hhvstaffing.com/audio/all.mp3'),
 ('am','https://hhvstaffing.com/audio/am.mp3'),
 ('and','https://hhvstaffing.com/audio/and.mp3'),
 ('at','https://hhvstaffing.com/audio/at.mp3'),
 ('ate','https://hhvstaffing.com/audio/ate.mp3'),
 ('be','https://hhvstaffing.com/audio/be.mp3'),
 ('big','https://hhvstaffing.com/audio/big.mp3'),
 ('but','https://hhvstaffing.com/audio/but.mp3'),
 ('came','https://hhvstaffing.com/audio/came.mp3'),
 ('can','https://hhvstaffing.com/audio/can.mp3'),
 ('come','https://hhvstaffing.com/audio/come.mp3'),
 ('did','https://hhvstaffing.com/audio/did.mp3'),
 ('do','https://hhvstaffing.com/audio/do.mp3'),
 ('down','https://hhvstaffing.com/audio/down.mp3'),
 ('eat','https://hhvstaffing.com/audio/eat.mp3'),
 ('for','https://hhvstaffing.com/audio/for.mp3'),
 ('get','https://hhvstaffing.com/audio/get.mp3'),
 ('go','https://hhvstaffing.com/audio/go.mp3'),
 ('he','https://hhvstaffing.com/audio/he.mp3'),
 ('in','https://hhvstaffing.com/audio/in.mp3'),
 ('into','https://hhvstaffing.com/audio/into.mp3'),
 ('is','https://hhvstaffing.com/audio/is.mp3'),
 ('it','https://hhvstaffing.com/audio/it.mp3'),
 ('jump','https://hhvstaffing.com/audio/jump.mp3'),
 ('like','https://hhvstaffing.com/audio/like.mp3'),
 ('look','https://hhvstaffing.com/audio/look.mp3'),
 ('make','https://hhvstaffing.com/audio/make.mp3'),
 ('me','https://hhvstaffing.com/audio/me.mp3'),
 ('my','https://hhvstaffing.com/audio/my.mp3'),
 ('no','https://hhvstaffing.com/audio/no.mp3'),
 ('not','https://hhvstaffing.com/audio/not.mp3'),
 ('on','https://hhvstaffing.com/audio/on.mp3'),
 ('one','https://hhvstaffing.com/audio/one.mp3'),
 ('play','https://hhvstaffing.com/audio/play.mp3'), 
 ('ran','https://hhvstaffing.com/audio/ran.mp3'),
 ('run','https://hhvstaffing.com/audio/run.mp3'),
 ('she','https://hhvstaffing.com/audio/she.mp3'),
 ('so','https://hhvstaffing.com/audio/so.mp3'),
 ('that','https://hhvstaffing.com/audio/that.mp3'),
 ('the','https://hhvstaffing.com/audio/the.mp3'),
 ('they','https://hhvstaffing.com/audio/they.mp3'),
('this','https://hhvstaffing.com/audio/this.mp3'),
('under','https://hhvstaffing.com/audio/under.mp3'),
('up','https://hhvstaffing.com/audio/up.mp3'),
('was','https://hhvstaffing.com/audio/was.mp3'),
('we','https://hhvstaffing.com/audio/we.mp3'),
('yes','https://hhvstaffing.com/audio/yes.mp3'),
('you','https://hhvstaffing.com/audio/you.mp3');


INSERT INTO deck(deck_name) 
VALUES
  ('Demo 1 (5 Cards)'),
  ('Demo 2 (3 Cards)'),
  ('Demo 3 (5 Cards)'),
  ('Demo 4 (7 Cards)');

 INSERT INTO deck_flashcard_link(deck_id_fk, flashcard_id_fk)
 VALUES
  (1,3),
  (1,7),
  (1,19),
  (1,20),
  (1,27),
  (2,18),
  (2,33),
  (2,41),
  (3,1),
  (3,2),
  (3,3),
  (3,4),
  (3,5),
  (4,19),
  (4,20),
  (4,28),
  (4,29),
  (4,37),
  (4,41),
  (4,45);

  INSERT INTO user_deck_link
  VALUES
    (5,1),
    (5,2),
    (5,3),
    (5,4),
    (4,2),
    (4,4); 

COMMIT;
