//Aqui va estar el codigo del servidor de express

import express from "express";
import morgan from "morgan";

// Exportamos e instanciamos la app de express
const app = express();

//usamos morgan para ver las peticiones por consola
app.use(morgan("dev"));

app.get("/", (req, res) =>
  res.json({ message: "Bienvenidos a nuestro proyecto" })
);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  res.status(500).json({ status: "error", message: err.message });
});

// Exportamos la app para usarla en otros archivos
export default app;
