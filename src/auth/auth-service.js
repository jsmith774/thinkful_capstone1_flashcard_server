const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const AuthService = {
  getUserWithUserName(db, user_name) {
    //return db('registered_user').where({ user_name }).first();
    //return db('registered_user as ru')
    //  .join('user_role as ur', 'ur.role_id', 'ru.role_id_fk')
    //  .select('user_name', 'full_name', 'role_name')
    //  .where({ user_name })
    //  .first();
    return db
      .select(
        'ru.id',
        'ru.user_name',
        'ru.full_name',
        'ru.password',
        'ur.role_name'
      )
      .from('registered_user as ru')
      .join('user_role as ur', 'ur.id', 'ru.role_id_fk')
      .where('ru.user_name', '=', user_name)
      .first();
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256',
    });
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256'],
    });
  },
  parseBasicToken(token) {
    return Buffer.from(token, 'base64').toString().split(':');
  },
};

module.exports = AuthService;
