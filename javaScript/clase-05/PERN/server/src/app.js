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

// Exportamos la app para usarla en otros archivos
export default app;
