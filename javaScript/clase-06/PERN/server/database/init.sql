#Creamos una tabla para las tareas

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
);