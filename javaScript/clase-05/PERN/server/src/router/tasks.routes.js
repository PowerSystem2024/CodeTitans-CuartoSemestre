import { Router } from "express";

const router = Router();

// Aqui van a estar las rutas relacionadas con las tareas

router.get("/tasks", (req, res) => res.send("Obteniendo tareas"));

router.get("/tasks/:id", (req, res) =>
  res.send("Obteniendo tarea con ID: " + req.params.id)
);

router.post("/tasks", (req, res) =>
  res.send("Creando tarea: " + JSON.stringify(req.body))
);

router.put("/tasks/:id", (req, res) =>
  res.send(
    "Actualizando tarea con ID: " +
      req.params.id +
      ", Nuevos datos: " +
      JSON.stringify(req.body)
  )
);

router.delete("/tasks/:id", (req, res) =>
  res.send("Eliminando tarea con ID: " + req.params.id)
);

export default router;
