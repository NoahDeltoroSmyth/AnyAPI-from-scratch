const pool = require('../utils/pool');

module.exports = class Movie {
  id;
  title;
  genre;
  duration;
  releaseDate;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.genre = row.genre;
    this.duration = row.duration;
    this.releaseDate = row.release_date;
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            movies
          `
    );
    return rows.map((row) => new Movie(row));
  }
};
