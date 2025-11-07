function hola(nombre) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("Hola " + nombre);
      resolve(nombre);
    }, 1000);
  });
}

function hablar(nombre) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log("bla bla bla bla bla bla bla bla ");
      resolve(nombre);
    }, 1000);
  });
}

function adios(nombre) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log("Adios " + nombre);
      //resolve();
      reject("Error en adios");
    }, 1000);
  });
}

//Llamamos a la función
console.log("Iniciando el proceso...");
hola("Marcelo")
  .then(hablar)
  .then(hablar)
  .then(hablar)
  .then(adios)
  .then((nombre) => {
    console.log("Terminando el proceso");
  })
  .catch((error) => {
    console.log("Hubo un error: ");
    console.log(error);
  });
