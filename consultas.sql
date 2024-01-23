-- aqui creo las consultas que le voy a pasar a postgres por la shell postgres

CREATE TABLE tablaNueva (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40),
    email TEXT
);
INSERT INTO djangocruddb_yf1v (nombre,email) VALUES($1, $2)', [nombre, email]

INSERT INTO registro2 ( nombre , email) VALUES
( 'willie', 'willie@gmail.com'),
( 'Billy', 'billy@gmail.com');

INSERT INTO registro2 ( nombre , email) VALUES
( 'Juan', 'Juan@gmail.com'),
( 'Boby', 'boby@gmail.com');