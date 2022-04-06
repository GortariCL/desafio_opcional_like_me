CREATE DATABASE likeme;

CREATE TABLE posts(
    id SERIAL NOT NULL,
    usuario VARCHAR(25) NOT NULL,
    url VARCHAR(1000) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    likes INT NOT NULL
);