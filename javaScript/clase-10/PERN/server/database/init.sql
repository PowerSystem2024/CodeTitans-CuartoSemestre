#Aqui crearemos todos nuestro "modelos" o tablas de la base de datos

#Creamos una tabla para las tareas

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
);

ALTER TABLE tasks ADD COLUMN usuario_id INTEGER REFERENCES users(id);

#Creamos una tabla para los usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

# Agregamos la columna gravatar_url para almacenar la URL del avatar de Gravatar
# md5 nos crea un avatar por defecto basado en el email del usuario
ALTER TABLE users ADD COLUMN gravatar_url VARCHAR(255);