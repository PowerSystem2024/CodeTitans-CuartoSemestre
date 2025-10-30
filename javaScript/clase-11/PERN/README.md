# PERN Stack - Gestor de Tareas

## 📋 Descripción del Proyecto

Aplicación full-stack de gestión de tareas (CRUD completo) desarrollada con el stack PERN (PostgreSQL, Express, React, Node.js). Permite a los usuarios registrarse, iniciar sesión y administrar sus tareas personales de forma segura mediante autenticación JWT con cookies.

## 🚀 Funcionalidades

- ✅ **Autenticación de usuarios** (Registro e inicio de sesión)
- ✅ **Gestión completa de tareas** (Crear, leer, actualizar y eliminar)
- ✅ **Protección de rutas** con middleware de autenticación
- ✅ **Validación de datos** con Zod
- ✅ **Manejo de sesiones** con JWT y cookies HTTP-only
- ✅ **Interfaz responsive** con Tailwind CSS
- ✅ **Gestión de estado** con Context API de React

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **PostgreSQL** - Base de datos relacional
- **pg** - Cliente de PostgreSQL para Node.js
- **JSON Web Tokens (JWT)** - Autenticación basada en tokens
- **bcryptjs** - Encriptación de contraseñas
- **Zod** - Validación de esquemas
- **cookie-parser** - Manejo de cookies
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Variables de entorno
- **morgan** - Logging de peticiones HTTP

### Frontend
- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **Vite** - Herramienta de construcción rápida
- **React Router DOM** - Enrutamiento del lado del cliente
- **Axios** - Cliente HTTP para peticiones
- **React Hook Form** - Manejo de formularios
- **Tailwind CSS** - Framework de utilidades CSS
- **js-cookie** - Manejo de cookies en el navegador
- **React Icons** - Iconos para React

## 📁 Estructura del Proyecto

```
PERN/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── navbar/
│   │   │   ├── tasks/
│   │   │   └── ui/
│   │   ├── context/           # Context API (AuthContext, TasksContext)
│   │   ├── pages/             # Páginas de la aplicación
│   │   ├── config/            # Configuración de Axios
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Backend Express
│   ├── src/
│   │   ├── controllers/       # Lógica de negocio
│   │   ├── middlewares/       # Middlewares personalizados
│   │   ├── router/            # Rutas de la API
│   │   ├── schemas/           # Validaciones con Zod
│   │   ├── libs/              # Utilidades (JWT)
│   │   ├── app.js             # Configuración de Express
│   │   ├── index.js           # Punto de entrada
│   │   ├── db.js              # Conexión a PostgreSQL
│   │   └── config.js          # Variables de configuración
│   ├── .env                   # Variables de entorno
│   └── package.json
│
└── database/
    └── init.sql               # Script de inicialización de la BD
```

## 🔧 Instalación y Configuración

### Prerrequisitos

- Node.js v18 o superior
- PostgreSQL v12 o superior
- npm o yarn

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/PERN.git
cd PERN
```

### 2. Configurar la Base de Datos

#### Crear la base de datos en PostgreSQL:

```bash
# Acceder a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE pern;

# Salir de psql
\q
```

#### Ejecutar el script de inicialización:

```bash
psql -U postgres -d pern -f database/init.sql
```

O ejecutar manualmente las tablas necesarias:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  gravatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configurar el Backend

```bash
cd server
npm install
```

#### Crear archivo `.env` en la carpeta `server`:

```env
PORT=3000
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=tu_contraseña_postgresql
PG_DATABASE=pern
FRONTEND_URL=http://localhost:5173
```

#### Iniciar el servidor:

```bash
npm run dev
```

El servidor estará corriendo en `http://localhost:3000`

### 4. Configurar el Frontend

```bash
cd ../client
npm install
```

#### Crear archivo `.env` en la carpeta `client` (si es necesario):

```env
VITE_API_URL=http://localhost:3000/api
```

#### Iniciar la aplicación:

```bash
npm run dev
```

La aplicación estará corriendo en `http://localhost:5173`

## 🌐 Variables de Entorno

### Backend (`server/.env`)

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `PG_HOST` | Host de PostgreSQL | `localhost` |
| `PG_PORT` | Puerto de PostgreSQL | `5432` |
| `PG_USER` | Usuario de PostgreSQL | `postgres` |
| `PG_PASSWORD` | Contraseña de PostgreSQL | - |
| `PG_DATABASE` | Nombre de la base de datos | `pern` |
| `FRONTEND_URL` | URL del frontend | `http://localhost:5173` |

## 📡 Endpoints de la API

### Autenticación

- `POST /api/register` - Registrar nuevo usuario
- `POST /api/login` - Iniciar sesión
- `POST /api/logout` - Cerrar sesión
- `GET /api/profile` - Obtener perfil del usuario autenticado

### Tareas (requieren autenticación)

- `GET /api/tasks` - Obtener todas las tareas del usuario
- `GET /api/tasks/:id` - Obtener una tarea por ID
- `POST /api/tasks` - Crear nueva tarea
- `PUT /api/tasks/:id` - Actualizar tarea
- `DELETE /api/tasks/:id` - Eliminar tarea

## 🔒 Seguridad

- Contraseñas encriptadas con bcryptjs
- Autenticación con JWT almacenado en cookies HTTP-only
- Validación de datos con Zod
- Middleware de autenticación para rutas protegidas
- CORS configurado para el frontend específico

## 🚀 Despliegue

### Backend (Render, Railway, etc.)

1. Configurar las variables de entorno en la plataforma
2. Conectar la base de datos PostgreSQL
3. Desplegar desde el directorio `server`

### Frontend (Vercel, Netlify, etc.)

1. Actualizar `VITE_API_URL` con la URL del backend desplegado
2. Desplegar desde el directorio `client`

## 📝 Notas Importantes

- Asegúrate de que PostgreSQL esté corriendo antes de iniciar el servidor
- Verifica que las credenciales de la base de datos en `.env` sean correctas
- El frontend y backend deben estar corriendo simultáneamente en desarrollo
- Las cookies requieren que ambos (frontend y backend) estén en el mismo dominio o configures CORS correctamente

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autores

Desarrollado como proyecto educativo para la materia de JavaScript - TUP UTN.

---

⭐ Si te ha gustado este proyecto, ¡no olvides darle una estrella!
