import Router from "express-promise-router";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/tasks.controller.js";

import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/tasks.schema.js";

const router = Router();

// Aqui van a estar las rutas relacionadas con las tareas

router.get("/tasks", isAuth, getTasks);

router.get("/tasks/:id", isAuth, getTaskById);

router.post("/tasks", isAuth, validateSchema(createTaskSchema), createTask);

router.put("/tasks/:id", isAuth, validateSchema(updateTaskSchema), updateTask);

router.delete("/tasks/:id", isAuth, deleteTask);

export default router;
