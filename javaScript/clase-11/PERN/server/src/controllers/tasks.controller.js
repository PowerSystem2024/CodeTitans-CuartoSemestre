// Controlador para las tareas

import { pool } from "../db.js";

export const getTasks = async (req, res) => {
  console.log(req.userId);
  const result = await pool.query("SELECT * FROM tasks WHERE usuario_id = $1", [
    req.userId,
  ]);

  return res.json(result.rows);
};

export const getTaskById = async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [
    req.params.id,
  ]);
  if (result.rowCount === 0)
    return res.status(404).json({ message: "Tarea no encontrada" });
  return res.json(result.rows[0]);
};

export const createTask = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, usuario_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, req.userId]
    );
    res.json(result.rows[0]);
    console.log(result);
    // res.send("Creando tarea");
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ message: "La tarea con ese título ya existe" });
    }
    console.error(error);
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

export const updateTask = async (req, res) => {
  const { title, description } = req.body;
  const id = req.params.id;
  const result = await pool.query(
    "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *",
    [title, description, id]
  );
  if (result.rowCount === 0)
    return res.status(404).json({ message: "Tarea no encontrada" });
  return res.json(result.rows[0]);
};

export const deleteTask = async (req, res) => {
  const result = await pool.query("DELETE FROM tasks WHERE id = $1", [
    req.params.id,
  ]);
  if (result.rowCount === 0)
    return res.status(404).json({ message: "Tarea no encontrada" });
  return res.send(`Tarea ${req.params.id} eliminada con éxito`);
};
