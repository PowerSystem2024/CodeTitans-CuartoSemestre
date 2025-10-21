console.log("Hola Titanes del codigo!");

var i = 0;

//Creamos una funcion para que no se cierre la consola
setInterval(function () {
  console.log(i);
  i++;

  //Creamos un error forzado
  //   if (i === 5) {
  //     console.log("Error forzado");
  //     var a = 3 + z;
  //   }
}, 1000);

/**
 * Esta es una instruccion que se ejecuta antes del setInterval
 * luego se ejecuta el setInterval
 * En node se ejecuta de manera monohilo, es decir cuando te toca y no de arriba a abajo
 *
 */

console.log("Segunda instruccion");
