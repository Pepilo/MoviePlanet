CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    id_user INT,
    id_movie INT,
    content TEXT
);