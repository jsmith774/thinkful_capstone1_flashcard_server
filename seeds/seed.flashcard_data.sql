BEGIN;

TRUNCATE
  user_deck_link, deck_flashcard_link, deck, flashcard
  RESTART IDENTITY CASCADE;


INSERT INTO flashcard(card_prompt, card_answer)
VALUES
 ('go','https://drive.google.com/file/d/195OfhMPFqmhRrPQLacmQsuXvLV2Tg_nj/view?usp=sharing'),
 ('bunny','https://drive.google.com/file/d/195OfhMPFqmhRrPQLacmQsuXvLV2Tg_nj/view?usp=sharing'),
 ('go2','https://drive.google.com/file/d/195OfhMPFqmhRrPQLacmQsuXvLV2Tg_nj/view?usp=sharing'),
 ('go3','https://drive.google.com/file/d/195OfhMPFqmhRrPQLacmQsuXvLV2Tg_nj/view?usp=sharing'),
 ('go4','https://drive.google.com/file/d/195OfhMPFqmhRrPQLacmQsuXvLV2Tg_nj/view?usp=sharing'),
 ('go5','https://drive.google.com/file/d/195OfhMPFqmhRrPQLacmQsuXvLV2Tg_nj/view?usp=sharing'),
 ('go6','https://drive.google.com/file/d/195OfhMPFqmhRrPQLacmQsuXvLV2Tg_nj/view?usp=sharing'),
 ('go7','https://drive.google.com/file/d/195OfhMPFqmhRrPQLacmQsuXvLV2Tg_nj/view?usp=sharing'),
 ('go8','https://drive.google.com/file/d/195OfhMPFqmhRrPQLacmQsuXvLV2Tg_nj/view?usp=sharing'),
 ('go9','https://drive.google.com/file/d/195OfhMPFqmhRrPQLacmQsuXvLV2Tg_nj/view?usp=sharing');


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
