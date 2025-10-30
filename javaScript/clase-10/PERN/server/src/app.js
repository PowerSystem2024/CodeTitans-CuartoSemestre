//Aqui va estar el codigo del servidor de express
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import tasksRoutes from "./router/tasks.routes.js";
import authRoutes from "./router/auth.routes.js";
import cors from "cors";

// Exportamos e instanciamos la app de express
const app = express();

//usamos morgan para ver las peticiones por consola
app.use(morgan("dev"));
//permitir solicitudes desde otros dominios
//en este caso solo le damos permiso a nuestro front
app.use(
  cors({
    origin: process.env.FRONTEND_URL, //la URL del frontend
    credentials: true, //permitir cookies
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
app.use("/api", tasksRoutes);
app.use("/api", authRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  res.status(500).json({ status: "error", message: err.message });
});

// Exportamos la app para usarla en otros archivos
export default app;
