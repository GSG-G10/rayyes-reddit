BEGIN;

DROP TABLE IF EXISTS users, posts, comments, votes;
DROP TYPE IF EXISTS vote;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    user_name VARCHAR(50) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    img VARCHAR
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    title VARCHAR(100) NOT NULL,
    content VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    img VARCHAR
);

CREATE TYPE vote AS ENUM ('1', '-1');

CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    vote_value vote,
    user_id INT,
    post_id INT,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_post FOREIGN KEY(post_id) REFERENCES posts(id),
    UNIQUE (user_id, post_id, vote_value)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT,
    post_id INT,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_post FOREIGN KEY(post_id) REFERENCES posts(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    content VARCHAR(100) NOT NULL
);

COMMIT;
