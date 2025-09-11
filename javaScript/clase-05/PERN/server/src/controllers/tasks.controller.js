// Controlador para las tareas

export const getTasks = (req, res) => res.send("Obteniendo tareas");

export const getTaskById = (req, res) =>
  res.send("Obteniendo tarea con ID: " + req.params.id);

export const createTask = (req, res) =>
  res.send("Creando tarea: " + JSON.stringify(req.body));

export const updateTask = (req, res) =>
  res.send(
    "Actualizando tarea con ID: " +
      req.params.id +
      ", Nuevos datos: " +
      JSON.stringify(req.body)
  );

export const deleteTask = (req, res) =>
  res.send("Eliminando tarea con ID: " + req.params.id);
