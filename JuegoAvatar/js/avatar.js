import { Personaje } from "./personaje.js";

const btnJugar = document.getElementById("btn-jugar");
const btnPersonajeJugador = document.getElementById("btn-personaje");
const btnPuño = document.getElementById("btn-puño");
const btnPatada = document.getElementById("btn-patada");
const btnBarrida = document.getElementById("btn-barrida");
const btnReiniciar = document.getElementById("btn-reiniciar");

//Constantes Globales Funcion ToggleReglas
const contenidoReglas = document.getElementById("contenido-reglas");
const btnReglas = document.getElementById("btn-reglas");

//Variables Globales Selecciones de Ataque y Personaje
let inicio = document.getElementById("inicio")
let seleccionarPersonaje = document.getElementById("seleccionar-personaje")
let seleccionarAtaque = document.getElementById("seleccionar-ataque")
let mensajes = document.getElementById("mensajes")
let reiniciar = document.getElementById("reiniciar")

// Variables para los personajes y ataques
let personajeEnemigo = null;
const ataques = ["puño", "patada", "barrida"];

// Función para crear una nueva instancia de Personaje por nombre
function crearPersonajePorNombre(nombre) {
  switch (nombre.toLowerCase()) {
    case "zuko":
      return new Personaje("Zuko", "assets/zuko.webp", 3, ataques);
    case "katara":
      return new Personaje("Katara", "assets/katara.webp", 3, ataques);
    case "toph":
      return new Personaje("Toph", "assets/toph.webp", 3, ataques);
    case "aang":
      return new Personaje("Aang", "assets/aang.webp", 3, ataques);
    default:
      return null;
  }
}

// Variables para el conteo
let triunfos = 0;
let derrotas = 0;
//let vidasJugador = 3;
//let vidasEnemigo = 3;
let juegoTerminado = false; // para controlar el estado del juego
let personajeSeleccionado = ""; // guardamos el personaje elegido


// Eventos
btnJugar.addEventListener("click", iniciarJuego);
btnPersonajeJugador.addEventListener("click", seleccionarPersonajeJugador);
btnPuño.addEventListener("click", ataquePuño);
btnPatada.addEventListener("click", ataquePatada);
btnBarrida.addEventListener("click", ataqueBarrida);
btnReiniciar.addEventListener("click", reiniciarJuego);

// Eventos para seleccionar personaje con botones
const botonesPersonaje = document.querySelectorAll(".personaje");
botonesPersonaje.forEach((btn) => {
  btn.addEventListener("click", () => {
    // quitar selección previa
    botonesPersonaje.forEach((b) => b.classList.remove("seleccionado"));
    // marcar el nuevo
    btn.classList.add("seleccionado");
    const nombre = btn.dataset.personaje;
    personajeSeleccionado = crearPersonajePorNombre(nombre);
    console.log("Personaje elegido:", personajeSeleccionado);
  });
});
window.onload = reiniciarJuego()


// Función para mostrar/ocultar reglas
function toggleReglas() {
  
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
  inicio.style.display = "none";
  seleccionarPersonaje.style.display = "block";
  seleccionarAtaque.style.display = "none";
  mensajes.style.display = "none";
  reiniciar.style.display = "none";
}

// Función para mostrar la sección de ataques
function mostrarSeccionAtaques() {
  inicio.style.display = "none";
  seleccionarPersonaje.style.display = "none";
  seleccionarAtaque.style.display = "block";
  mensajes.style.display = "block";
  reiniciar.style.display = "none";
}

// Función para mostrar botón reiniciar cuando termina el juego
function mostrarReiniciar() {
  reiniciar.style.display = "block";
}

// Función para elegir aleatoriamente el personaje del enemigo
function enemigoAleatorio() {
  const nombresDisponibles = ["zuko", "katara", "toph", "aang"];
  const nombreEnemigoAleatorio = nombresDisponibles[Math.floor(Math.random() * nombresDisponibles.length)];
  return crearPersonajePorNombre(nombreEnemigoAleatorio);
}

// Función para elegir ataque aleatorio del enemigo
function ataqueAleatorioEnemigo() {
  return ataques[(Math.floor(Math.random() * ataques.length))];
}

function renderizarVidas() {
  const corazon = '<img src="assets/heart1.png" alt="vida" style="width:32px;height:32px;margin:2px;">';
  document.getElementById("vidas-jugador").innerHTML = corazon.repeat(personajeSeleccionado?.vidas || 0);
  document.getElementById("vidas-enemigo").innerHTML = corazon.repeat(personajeEnemigo?.vidas || 0);
}

function combate(ataqueJugador, ataqueEnemigo) {
  if (juegoTerminado) {
    return "";
  }

  let resultado = "";

  if (ataqueEnemigo === ataqueJugador) {
    resultado = "EMPATE";
  } else if (ataqueJugador === "puño" && ataqueEnemigo === "barrida") {
    personajeEnemigo.perderVida();
    resultado = "GANASTE";
  } else if (ataqueJugador === "patada" && ataqueEnemigo === "puño") {
    personajeEnemigo.perderVida();
    resultado = "GANASTE";
  } else if (ataqueJugador === "barrida" && ataqueEnemigo === "patada") {
    personajeEnemigo.perderVida();
    resultado = "GANASTE";
  } else {
    personajeSeleccionado.perderVida();
    resultado = "PERDISTE";
  }

  renderizarVidas(); // <-- Actualiza los corazones

  if (personajeEnemigo.vidas === 0 || personajeSeleccionado.vidas === 0) {
    revisarVidas();
  }

  return resultado;
}

// Función para revisar vidas y determinar ganador
function revisarVidas() {
  if (personajeEnemigo.vidas === 0) {
    juegoTerminado = true;
    mostrarMensajeFinal("¡GANASTE EL JUEGO! 🎉 Has derrotado al enemigo");
  } else if (personajeSeleccionado.vidas === 0) {
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
  if (!personajeSeleccionado) {
    alert("Debes seleccionar un personaje");
    return;
  }
  
  // Renderizar carta del personaje jugador (ya es una instancia creada en el click)
  document.getElementById("personaje-jugador").innerHTML = `
    <div class="personaje">
      <img src="${personajeSeleccionado.imagen}" alt="${personajeSeleccionado.nombre}">
      <p>${personajeSeleccionado.nombre}</p>
    </div>
  `;

  // Seleccionar personaje enemigo como nueva instancia aleatoria
  personajeEnemigo = enemigoAleatorio();
  document.getElementById("personaje-enemigo").innerHTML = `
  <div class="personaje">
  <img src="${personajeEnemigo.imagen}" alt="${personajeEnemigo.nombre}">
  <p>${personajeEnemigo.nombre}</p>
  </div>
  `;
  
  renderizarVidas();
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
  // limpiar estado
  juegoTerminado = false;
  personajeSeleccionado = null;
  personajeEnemigo = null;
  renderizarVidas(); // <-- Inicializa los corazones

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

window.toggleReglas = toggleReglas;