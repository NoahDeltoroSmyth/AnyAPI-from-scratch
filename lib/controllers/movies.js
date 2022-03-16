const { Router } = require('express');
const Movie = require('../models/Movie');

module.exports = Router()
  //
  .get('/', async (req, res) => {
    const movies = await Movie.findAll();
    res.send(movies);
  })

  .post('/', async (req, res) => {
    const movie = await Movie.insert(req.body);
    res.send(movie);
  })

  .get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
  });
