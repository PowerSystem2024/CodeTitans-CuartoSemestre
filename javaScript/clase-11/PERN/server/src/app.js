//Aqui va estar el codigo del servidor de express
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import tasksRoutes from "./router/tasks.routes.js";
import authRoutes from "./router/auth.routes.js";
import cors from "cors";
import { pool } from "./db.js";
import { FRONTEND_URL } from "./config.js";

// Exportamos e instanciamos la app de express
const app = express();

//usamos morgan para ver las peticiones por consola
app.use(morgan("dev"));
//permitir solicitudes desde otros dominios
//en este caso solo le damos permiso a nuestro front
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// Para que el servidor entienda JSON
app.use(express.json());
app.use(cookieParser()); // Para manejar cookies

// Para que el servidor entienda datos de formularios
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.json({ message: "Bienvenidos a nuestro proyecto" })
);
app.get("/api/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows[0]);
});
app.use("/api", tasksRoutes);
app.use("/api", authRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  res.status(500).json({ status: "error", message: err.message });
});

// Exportamos la app para usarla en otros archivos
export default app;
