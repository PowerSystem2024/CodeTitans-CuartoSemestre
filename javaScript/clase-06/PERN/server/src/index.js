//Aqui va a estar el punto de entrada del servidor

import app from "./app.js";
//import { pool } from "./db.js";

// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res.rows);
//   app.listen(3000); // Puerto donde va a escuchar el servidor
//   console.log("Servidor ejecutándose en el puerto", 3000);
//   pool.end();
// });

app.listen(3000); // Puerto donde va a escuchar el servidor
console.log("Servidor ejecutándose en el puerto", 3000);
