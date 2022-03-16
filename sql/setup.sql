-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    duration INT NOT NULL,
    release_date INT NOT NULL
);

-- INSERT INTO
-- movies (title, genre, duration, release_date);
-- VALUES
--     ('The Pick of Destiny', 'comedy', 94, 2006),