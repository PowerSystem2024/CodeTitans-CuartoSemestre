const btnJugar = document.getElementById("btn-jugar");
const btnPersonajeJugador = document.getElementById("btn-personaje");
const btnPuño = document.getElementById("btn-puño");
const btnPatada = document.getElementById("btn-patada");
const btnBarrida = document.getElementById("btn-barrida");
const btnReiniciar = document.getElementById("btn-reiniciar");

// Variables para el conteo
let triunfos = 0;
let derrotas = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let juegoTerminado = false; // para controlar el estado del juego
let personajeSeleccionado = ""; // guardamos el personaje elegido


// Función para mostrar/ocultar reglas
function toggleReglas() {
  const contenidoReglas = document.getElementById("contenido-reglas");
  const btnReglas = document.getElementById("btn-reglas");
  
  if (contenidoReglas.style.display === "none") {
    contenidoReglas.style.display = "block";
    btnReglas.textContent = "🔼 Ocultar Reglas";
  } else {
    contenidoReglas.style.display = "none";
    btnReglas.textContent = "📋 Ver Reglas del Juego";
  }
}

// Función para iniciar el juego (mostrar selección de personaje)
function iniciarJuego() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("seleccionar-personaje").style.display = "block";
  document.getElementById("seleccionar-ataque").style.display = "none";
  document.getElementById("mensajes").style.display = "none";
  document.getElementById("reiniciar").style.display = "none";
}

// Función para mostrar la sección de ataques
function mostrarSeccionAtaques() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("seleccionar-personaje").style.display = "none";
  document.getElementById("seleccionar-ataque").style.display = "block";
  document.getElementById("mensajes").style.display = "block";
  document.getElementById("reiniciar").style.display = "none";
}

// Función para mostrar botón reiniciar cuando termina el juego
function mostrarReiniciar() {
  document.getElementById("reiniciar").style.display = "block";
}

// Función para elegir aleatoriamente el personaje del enemigo
function aleatoria() {
  const personajes = ["Zuko", "Katara", "Toph", "Aang"];
  const indiceAleatorio = Math.floor(Math.random() * personajes.length);
  return personajes[indiceAleatorio];
}

// Función para elegir ataque aleatorio del enemigo
function ataqueAleatorioEnemigo() {
  const ataques = ["puño", "patada", "barrida"];
  const indiceAleatorio = Math.floor(Math.random() * ataques.length);
  return ataques[indiceAleatorio];
}


function combate(ataqueJugador, ataqueEnemigo) {
  if (juegoTerminado) {
    return "";
  }

  let resultado = "";

  if (ataqueEnemigo === ataqueJugador) {
    resultado = "EMPATE";
  } else if (ataqueJugador === "puño" && ataqueEnemigo === "barrida") {
    vidasEnemigo--;
    resultado = "GANASTE";
  } else if (ataqueJugador === "patada" && ataqueEnemigo === "puño") {
    vidasEnemigo--;
    resultado = "GANASTE";
  } else if (ataqueJugador === "barrida" && ataqueEnemigo === "patada") {
    vidasEnemigo--;
    resultado = "GANASTE";
  } else {
    vidasJugador--;
    resultado = "PERDISTE";
  }

  document.getElementById("vidas-jugador").innerText = vidasJugador;
  document.getElementById("vidas-enemigo").innerText = vidasEnemigo;

  if (vidasEnemigo === 0 || vidasJugador === 0) {
    revisarVidas();
  }

  return resultado;
}

// Función para revisar vidas y determinar ganador
function revisarVidas() {
  if (vidasEnemigo === 0) {
    juegoTerminado = true;
    mostrarMensajeFinal("¡GANASTE EL JUEGO! 🎉 Has derrotado al enemigo");
  } else if (vidasJugador === 0) {
    juegoTerminado = true;
    mostrarMensajeFinal("¡PERDISTE EL JUEGO! 😞 El enemigo te ha derrotado");
  }
}

// Función para mostrar mensaje final
function mostrarMensajeFinal(mensaje) {
  const nuevoParrafo = document.createElement("p");
  nuevoParrafo.innerText = mensaje;
  nuevoParrafo.style.fontWeight = "bold";
  nuevoParrafo.style.fontSize = "18px";
  nuevoParrafo.style.color = "red";
  document.getElementById("mensajes").appendChild(nuevoParrafo);
  
  btnPuño.disabled = true;
  btnPatada.disabled = true;
  btnBarrida.disabled = true;
  
  mostrarReiniciar();
}



function seleccionarPersonajeJugador() {
  if (personajeSeleccionado === "") {
    alert("Debes seleccionar un personaje");
    return;
  }
  
  // Renderizar carta del personaje jugador
  document.getElementById("personaje-jugador").innerHTML = `
  <div class="personaje">
  <img src="assets/${personajeSeleccionado.toLowerCase()}.webp" alt="${personajeSeleccionado}">
  <p>${personajeSeleccionado}</p>
  </div>
  `;
  
  // Seleccionar personaje enemigo
  const personajeEnemigo = aleatoria();
  document.getElementById("personaje-enemigo").innerHTML = `
  <div class="personaje">
  <img src="assets/${personajeEnemigo.toLowerCase()}.webp" alt="${personajeEnemigo}">
  <p>${personajeEnemigo}</p>
  </div>
  `;
  
  mostrarSeccionAtaques();
}


//Funcion para manejar ataques
function ataque(tipoAtaque) {
  if (juegoTerminado) {
    return;
  }
  
  const ataqueEnemigo = ataqueAleatorioEnemigo();
  const resultado = combate(tipoAtaque, ataqueEnemigo);
  
  const nuevoParrafo = document.createElement("p");
  const personajeJugador =
  document.getElementById("personaje-jugador").innerText;
  const personajeEnemigo =
  document.getElementById("personaje-enemigo").innerText;
  
  nuevoParrafo.innerText = `Tu personaje ${personajeJugador} atacó con ${tipoAtaque}, el personaje ${personajeEnemigo} del enemigo atacó con ${ataqueEnemigo} - ${resultado}`;
  
  document.getElementById("mensajes").appendChild(nuevoParrafo);
}

function ataquePuño() {
  ataque("puño");
}
function ataquePatada() {
  ataque("patada");
}
function ataqueBarrida() {
  ataque("barrida");
}

//Función para reiniciar el juego
function reiniciarJuego() {
  vidasJugador = 3;
  vidasEnemigo = 3;
  juegoTerminado = false;
  personajeSeleccionado = "";
  
  document.getElementById("vidas-jugador").innerText = vidasJugador;
  document.getElementById("vidas-enemigo").innerText = vidasEnemigo;
  
  btnPuño.disabled = false;
  btnPatada.disabled = false;
  btnBarrida.disabled = false;
  
  document.getElementById("personaje-jugador").innerText = "";
  document.getElementById("personaje-enemigo").innerText = "";
  document.getElementById("mensajes").innerHTML = "";
  
  // 🔄 limpiar selección de botones
  document.querySelectorAll(".personaje").forEach((btn) =>
    btn.classList.remove("seleccionado")
);

document.getElementById("inicio").style.display = "flex";
document.getElementById("seleccionar-personaje").style.display = "none";
document.getElementById("seleccionar-ataque").style.display = "none";
document.getElementById("mensajes").style.display = "none";
document.getElementById("reiniciar").style.display = "none";
}

// Eventos
btnJugar.addEventListener("click", iniciarJuego);
btnPersonajeJugador.addEventListener("click", seleccionarPersonajeJugador);
btnPuño.addEventListener("click", ataquePuño);
btnPatada.addEventListener("click", ataquePatada);
btnBarrida.addEventListener("click", ataqueBarrida);
btnReiniciar.addEventListener("click", reiniciarJuego);

// 👉 Nuevo: eventos para seleccionar personaje con botones
const botonesPersonaje = document.querySelectorAll(".personaje");
botonesPersonaje.forEach((btn) => {
  btn.addEventListener("click", () => {
    // quitar selección previa
    botonesPersonaje.forEach((b) => b.classList.remove("seleccionado"));
    // marcar el nuevo
    btn.classList.add("seleccionado");
    personajeSeleccionado = btn.dataset.personaje;
    console.log("Personaje elegido:", personajeSeleccionado);
  });
});
window.onload = reiniciarJuego()
