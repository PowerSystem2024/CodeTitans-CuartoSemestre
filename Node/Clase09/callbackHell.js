function hola(nombre, miCallback) {
  setTimeout(function () {
    console.log("Hola " + nombre);
    miCallback(nombre);
  }, 1000);
}

function hablar(callbackHablar) {
  setTimeout(function () {
    console.log("bla bla bla bla bla bla bla");
    callbackHablar();
  }, 1000);
}

function adios(nombre, otroCallback) {
  setTimeout(function () {
    console.log("Adios " + nombre);
    otroCallback();
  }, 1500);
}

// Función recursiva para evitar el callbackHell
function conversacion(nombre, veces, callback) {
  if (veces > 0) {
    hablar(function () {
      conversacion(nombre, --veces, callback);
    });
  } else {
    callback(nombre, callback);
  }
}

// Proceso principal
console.log("Iniciando el proceso...");
hola("Marcelo", function (nombre) {
  conversacion(nombre, 4, function () {
    console.log("Terminando el proceso...");
  });
});

// Lo comentamos para que quede como ejemplo lo que es el callbackHell
// hola("Marcos", function (nombre) {
//   hablar(function () {
//     hablar(function () {
//       hablar(function () {
//         hablar(function () {
//           adios(nombre, function () {
//             console.log("Terminando el proceso...");
//           });
//         });
//       });
//     });
//   });
// });
