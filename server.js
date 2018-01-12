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

app.use(bodyParser.urlencoded({ extended: false }));

// DB connection
const knex = require('./db.js');

// Landing page
app.get('/', (req, res) => {
  res.render('site/index');
});


// GET form to POST new bird
app.get('/birds/new', (req, res) => {
  knex('birds').then((rows) => {
    res.format({
      'application/json': () => res.json(rows),
      'text/html': () => res.render('birds/index', { birds: rows }),
      'default': () => res.sendStatus(406) })
    })
});

// GET BIRDS
app.get('/birds', (req, res) => {
  knex('birds').then((rows) => {
    res.format({
      'application/json': () => res.json(rows),
      'text/html': () => res.render('birds/index', { birds: rows }),
      'default': () => res.sendStatus(406)
    });
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

    res.format({
      'application/json': () => res.json(bird),
      'text/html': () => res.render('birds/index', { birds: rows }),
      'default': () => res.sendStatus(406)
    });
  });
});

// FETCH A BIRD
app.get('/birds/:bird_id', (req, res) => {
  const birdID = req.params.bird_id;

  knex('birds')
    .where('id', birdID)
    .then((rows) => {
      const foundBird = rows[0];

      res.format({
        'application/json': () => res.json(foundTodo),
        'text/html': () => res.render('birds/show', { bird: foundBird }),
        'default': () => res.sendStatus(406)
      });
    })
    .catch(() => {
      res.sendStatus(404);
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
