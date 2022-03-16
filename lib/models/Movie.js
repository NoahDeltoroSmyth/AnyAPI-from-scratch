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

  static async insert({ title, genre, duration, releaseDate }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        movies (title, genre, duration, release_date)
      VALUES
        ($1, $2, $3, $4)
      RETURNING
        *
      `,
      [title, genre, duration, releaseDate]
    );
    return new Movie(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        movies
      WHERE
        id=$1
      `,
      [id]
    );
    return new Movie(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        movies
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Movie(rows[0]);
  }
};
