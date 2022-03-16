const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Movie = require('../lib/models/Movie');

describe('AnyAPI-from-scratch routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('gets a list of movies', async () => {
    await Movie.insert({
      title: 'Step Brothers',
      genre: 'comedy',
      duration: 98,
      releaseDate: 2008,
    });
    await Movie.insert({
      title: 'Free Willy',
      genre: 'comedy',
      duration: 100,
      releaseDate: 2001,
    });
    const expected = await Movie.findAll();
    const res = await request(app).get('/api/v1/movies');
    expect(res.body).toEqual(expected);
  });

  it('creates a movie', async () => {
    const expected = {
      title: 'Step Brothers',
      genre: 'comedy',
      duration: 98,
      releaseDate: 2008,
    };
    const res = await request(app).post('/api/v1/movies').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a movie by id', async () => {
    const movie = await Movie.insert({
      title: 'Step Brothers',
      genre: 'comedy',
      duration: 98,
      releaseDate: 2008,
    });
    const res = await request(app).get(`/api/v1/movies/${movie.id}`);
    expect(res.body).toEqual(movie);
  });

  it('updates a movie by id', async () => {
    const movie = await Movie.insert({
      title: 'Step Brothers',
      genre: 'comedy',
      duration: 98,
      releaseDate: 2008,
    });
    const res = await request(app)
      .patch(`/api/v1/movies/${movie.id}`)
      .send({ title: 'Dunstin Checks In' });
    expect(res.body).toEqual({ ...movie, title: 'Dunstin Checks In' });
  });

  it('deletes a movie by id', async () => {
    const movie = await Movie.insert({
      title: 'Step Brothers',
      genre: 'comedy',
      duration: 98,
      releaseDate: 2008,
    });
    const res = await request(app).delete(`/api/v1/movies/${movie.id}`);
    expect(res.body).toEqual(movie);
  });
});
