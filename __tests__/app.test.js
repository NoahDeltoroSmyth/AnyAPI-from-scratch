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
    const expected = await Movie.findAll();
    const res = await request(app).get('/api/v1/movies');
    expect(res.body).toEqual(expected);
  });

  it('creates a movie', async () => {
    const expected = {
      title: 'Step Brothers',
      genre: 'comedy',
      duration: '98',
      releaseDate: '2008',
    };
    const res = await request(app).post('/api/v1/movies').send(expected);
    expect(res.body).toEqual({ id: expect.any(Number), ...expected });
  });
});
