BEGIN;

TRUNCATE
  deck, flashcard
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
  
COMMIT;
