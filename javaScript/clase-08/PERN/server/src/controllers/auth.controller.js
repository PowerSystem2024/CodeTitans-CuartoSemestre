import { pool } from "../db.js";
import bcrypt from "bcrypt";
import createAccessToken from "../libs/jwt.js";

// Controlador para la autenticación

export const login = (req, res) =>
  res.send("Iniciando sesión con datos: " + JSON.stringify(req.body));

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Guardar el usuario en la base de datos
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    // Crear un token de acceso
    const token = await createAccessToken({ id: result.rows[0].id });
    console.log(result);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    //return res.json(result.rows[0]);
    return res.json({ token: token });
  } catch (error) {
    if (error.code === "23505") {
      // Código de error para violación de restricción única
      return res
        .status(400)
        .json({ error: "Error: El correo electrónico ya está en uso." });
    }
    // Manejar otros errores
    console.error("Error durante el registro:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const logout = (req, res) => res.send("Cerrando sesión");

export const getProfile = (req, res) =>
  res.send("Obteniendo perfil de usuario");
