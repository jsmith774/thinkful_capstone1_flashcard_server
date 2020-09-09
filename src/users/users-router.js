const express = require('express');
const UsersService = require('./users-service');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter
  .route('/students')
  .get((req, res, next) => {
    return UsersService.getStudents(req.app.get('db'))
      .then((students) => {
        return res.json(students);
        //return res.json(students.map(StudentsService.serialize));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    //todo implement POST
    console.log('IMPLEMENT POST HERE');
    res.send(req.body);
  });

module.exports = usersRouter;
