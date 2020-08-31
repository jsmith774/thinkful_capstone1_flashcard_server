BEGIN;

TRUNCATE
  registered_user,
  user_role
  RESTART IDENTITY CASCADE;


INSERT INTO user_role (role_name)
VALUES
 ('Educator'),
 ('Student');

INSERT INTO registered_user (user_name, full_name, password, role_id_fk)
VALUES
  ('mrssmith', 'Mrs. Smith', '$2a$12$5spebpyYx3xb1gyDGRCyVum61CX96JNRp/ILhUcKfTxJxiaBZQ502',1),
  ('buttreflyinthesky', 'LeVar Burton', '$2a$12$43FNQNBK7VAOw.tGgMGkk.0R7b0sGaeMnBnuYFubEeMBy14IyZcue',1),
  ('scienceguy', 'Bill Nye', '$2a$12$JrCEFYH3MS18QEnHxApVRu.SUVmgs.KCThilbMUpxuhQJlKaqqBH2',1),
  ('liljohn', 'John Doe', '$2a$12$3qXKniNHiCaIaEgNH2LKgOLx.LuJw19.gRwmWy7b8TgFw/zKcF02u',2),
  ('plainjane', 'Jane Doe ', '$2a$12$ZsT5gtzpu6mmRYT16s1ATO/m6.qDVx.5mLHvv/ZjjoRhBAA/LtaSG',2);

COMMIT;
