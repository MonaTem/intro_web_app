// jshint esversion: 6

// module config
const express = require('express');
const app = express();
const PORT = 8000;
const morgan = require('morgan');
const bodyParser = require('body-parser');

// blending mods
app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static('public'));

// DB connection
const knex = require('./db.js');

// GET BIRDS
app.get('/birds', (req, res) => {
  knex('birds').then((rows) => {
    res.json(rows);
  });
});

// GET A BIRD
app.get('/birds/:bird_id', (req, res) => {
  const birdID = req.params.bird_id;

  knex('birds')
    .where('id', birdID)
    .then((rows) => {
      const foundBird = rows[0];

      res.json(foundBird);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

// POST BIRDS
app.post('/birds', (req, res) => {
  // declare variables for the data in the body of the request
  const {  title, description } = req.body; // ??

  const newBird = { title, description }; // ??
  // connnect to DB to use information to write into the DB
  knex('birds')
    .insert(newBird) // inserts a new bird
    .returning('*')
    .then((rows) => {
      const bird = rows[0];

      res.json(bird);
    });
});

// PATCH BIRDS
app.patch('/birds/:bird_id', (req, res) => {
  const birdID = req.params.bird_id;
  const { title, description } = req.body;

  knex('birds')
    .where('id', birdID)
    .returning('*')
    .update({ title, description })
    .then((rows) => {
      const bird = rows[0];

      res.json(bird);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// DELETE BIRDS
app.delete('/birds/:bird_id', (req, res) => {
  const birdID = req.params.bird_id;

  knex('birds')
    .where('id', birdID)
    .del()
    .then(() => res.sendStatus(204));
});

// Listening
app.listen(PORT, () => {
  console.log('Running on', PORT);
});
