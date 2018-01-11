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

// GET BIRDS
app.get('/birds', (req, res) => {

});
// GET A BIRD
app.get('/birds/:bird_id', (req, res) => {

});
// POST BIRDS
app.post('/birds/:bird_id', (req, res) => {

});
// PATCH BIRDS
app.patch('/birds/:bird_id', (req, res) => {

});
// DELETE BIRDS
app.delete('/birds/:bird_id', (req, res) => {

});

// Listening
app.listen(PORT, () => {
  console.log('Running on', PORT);
});
