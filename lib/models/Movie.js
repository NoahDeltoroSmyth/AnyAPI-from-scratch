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

  static async updateMovie(id, attributes) {
    const existingMovie = await Movie.findById(id);
    const updatedAttributes = { ...existingMovie, ...attributes };
    const { title, genre, duration, releaseDate } = updatedAttributes;
    const { rows } = await pool.query(
      `
      UPDATE
        movies
      SET
        title=$1,
        genre=$2,
        duration=$3,
        release_date=$4
      WHERE
        id=$5
      RETURNING
        *
      `,
      [title, genre, duration, releaseDate, id]
    );
    return new Movie(rows[0]);
  }
};
