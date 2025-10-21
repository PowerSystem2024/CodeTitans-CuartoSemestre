# Clase 04 - Node.js y Event Loop

## ¿Qué es Node.js?

Node.js es un entorno de ejecución multiplataforma basado en JavaScript, es de código abierto y principalmente se usa para servidores web.

### Conceptos Básicos

Gracias a Node.js se puede **utilizar JavaScript fuera del navegador**, pudiendo usarse en cualquier plataforma como una aplicación. Esto da la ventaja de que si usas JavaScript, la capacidad de hacer las mismas cosas que otros lenguajes de scripting como Python.

Uno de los usos más comunes de Node.js es el desarrollo de servidores web. En un servidor web tradicional se tendría un hilo por cada usuario. Con Node.js solo se tiene un hilo, pero su diseño hace que las tareas de I/O no bloqueen el hilo y pueda continuar con unas peticiones mientras espera a otras.

## Ventajas de Node.js

- **Monohilo eficiente**: Node funciona en un solo hilo. Usa un bucle de eventos para procesar las llamadas no bloqueantes de I/O de forma concurrente en un solo hilo. Esto tiene la ventaja de tener menos uso de memoria que si usara varios hilos.

- **JavaScript optimizado**: Para interpretar JavaScript utiliza el motor V8, creado para Chrome, que está muy optimizado.

- **Gestión de paquetes**: Los desarrolladores pueden crear paquetes y subirlos a un repositorio (llamado npm) para distribuirlos.

## Limitaciones

- **CPU intensivas**: Cuando nos encontramos con tareas intensivas en CPU, Node.js tiene el módulo de Worker Threads para crear nuevos hilos. Cada hilo tiene su propia instancia de Node y del motor de JavaScript (para evitar problemas de concurrencia), por lo que tiene un impacto en la memoria.

- **Calidad de paquetes npm**: Calidad irregular en los módulos de npm. Existen paquetes muy estables y también otros que están poco probados y no tienen mucha documentación.

## Event Loop - El Corazón de Node.js

El Event Loop es el mecanismo que permite a Node.js realizar operaciones de I/O no bloqueantes, a pesar de que JavaScript es de un solo hilo.

### ¿Cómo funciona el Event Loop?

![Diagrama Event Loop](event-loop-diagram.png)

El Event Loop funciona de la siguiente manera:

1. **Event Queue**: Las funciones, peticiones (requests) y eventos se colocan en una cola de eventos.

2. **Event Loop**: El bucle de eventos constantly verifica si hay tareas en la cola.

3. **Thread Pool**: Para operaciones que requieren procesamiento intensivo, Node.js utiliza un pool de hilos:

   - **DB Ops** (Operaciones de Base de Datos)
   - **File** (Operaciones de Archivos)
   - **Slow Ops** (Operaciones Lentas)

4. **Threads**: Cada tipo de operación se ejecuta en hilos separados:
   - Thread para operaciones de DB
   - Thread para operaciones de archivos
   - Thread para operaciones lentas

### Fases del Event Loop

El Event Loop tiene varias fases que se ejecutan en orden:

1. **Timer phase**: Ejecuta callbacks programados por `setTimeout()` y `setInterval()`
2. **Pending callbacks phase**: Ejecuta callbacks de operaciones I/O aplazadas
3. **Poll phase**: Busca nuevos eventos I/O; ejecuta callbacks relacionados con I/O
4. **Check phase**: Ejecuta callbacks de `setImmediate()`
5. **Close callbacks phase**: Ejecuta callbacks de cierre como `socket.on('close', ...)`

### Ventajas del Event Loop

- **No bloqueo**: Las operaciones I/O no bloquean el hilo principal
- **Eficiencia**: Un solo hilo puede manejar miles de conexiones concurrentes
- **Escalabilidad**: Ideal para aplicaciones con muchas operaciones I/O
- **Simplicidad**: No hay que manejar la complejidad de múltiples hilos

### Ejemplo Práctico

```javascript
console.log("Inicio");

setTimeout(() => {
  console.log("Timeout");
}, 0);

setImmediate(() => {
  console.log("Immediate");
});

process.nextTick(() => {
  console.log("Next Tick");
});

console.log("Fin");

// Salida:
// Inicio
// Fin
// Next Tick
// Immediate
// Timeout
```

## Cuándo usar Node.js

Node.js es ideal para:

- **APIs REST**: Servicios web que manejan muchas peticiones concurrentes
- **Aplicaciones en tiempo real**: Chat, juegos multijugador, colaboración en vivo
- **Microservicios**: Arquitecturas distribuidas
- **Aplicaciones I/O intensivas**: Que requieren muchas operaciones de lectura/escritura

## Cuándo NO usar Node.js

Node.js no es la mejor opción para:

- **Aplicaciones CPU intensivas**: Cálculos matemáticos complejos, procesamiento de imágenes
- **Aplicaciones que requieren múltiples hilos**: Para paralelización real de CPU

## Conclusión

Node.js y su Event Loop revolucionaron el desarrollo de servidores web al permitir el manejo eficiente de muchas conexiones concurrentes con un solo hilo. Su arquitectura basada en eventos lo hace perfecto para aplicaciones I/O intensivas y tiempo real, aunque no es la mejor opción para tareas que requieren mucho procesamiento de CPU.

---

_Clase 04 - Programación en Node.js - UTN_
