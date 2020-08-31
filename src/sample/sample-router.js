const express = require('express');
const bodyParser = express.json();

const sampleRouter = express.Router;

//TODO
//* VERY SIMPLE ROUTER/PATH EXAMPLES - IMPROVE BEGINNING BOILERPLATE
sampleRouter
  .route('/')
  .get((req, res) => {
    res.send('Hello, sampleRouter!');
  })
  .post(bodyParser, (req, res) => {
    const { title, content } = req.body; //deconstruct req "field" values

    //validate fields
    //store new 'sample' object
  });

sampleRouter
  .route('/:sample_id')
  .all((req, res) => {
    //do common stuff (requireAuth(), checkSampleExists())
    //todo  another option use this pattern.all(requireAuth).all(checkSampleExists))
    //lookup sample with id = sample_id
    //  if not found res.send(404)
  })
  .get((req, res) => {
    //lookup sample with id = sample_id
  })
  .delete((req, res) => {
    //do delete
  })
  .patch((req, res) => {
    //do update
  });
module.exports = sampleRouter;
