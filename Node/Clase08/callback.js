function hola(nombre, miCallback) {
  setTimeout(function () {
    console.log("Hola " + nombre);
    miCallback();
  }, 1000);
}

function adios(nombre, otroCallback) {
  setTimeout(function () {
    console.log("Adios " + nombre);
    otroCallback();
  }, 1500);
}

console.log("Comenzando ...");
hola("Marcos", function (nombre) {
  adios(nombre, function () {
    console.log("Finalizando...");
  });
});

hola("Marcos", function () {});
adios("Marcos", function () {});
