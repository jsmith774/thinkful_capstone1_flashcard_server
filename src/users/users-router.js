const express = require('express');
const UsersService = require('./users-service');

const usersRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');

usersRouter
  .route('/students')
  .all(requireAuth)
  .get((req, res, next) => {
    return UsersService.getStudents(req.app.get('db'))
      .then((students) => {
        return res.json(students);
      })
      .catch(next);
  });

module.exports = usersRouter;
