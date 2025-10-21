import Router from "express-promise-router";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/tasks.controller.js";

const router = Router();

// Aqui van a estar las rutas relacionadas con las tareas

router.get("/tasks", getTasks);

router.get("/tasks/:id", getTaskById);

router.post("/tasks", createTask);

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);

export default router;
