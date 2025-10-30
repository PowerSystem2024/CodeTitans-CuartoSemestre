import { pool } from "../db.js";
import bcrypt from "bcrypt";
import createAccessToken from "../libs/jwt.js";
import md5 from "md5";

// Controlador para la autenticación
export const login = async (req, res) => {
  const { email, password } = req.body; // Obtener email y password del cuerpo de la solicitud

  //Confirmamos si el usuario existe
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  //Si no existe, retornamos un error
  if (result.rows.length === 0) {
    return res.status(400).json({ error: "Usuario no encontrado" });
  }

  //Si existe, comparamos la contraseña
  const user = result.rows[0];
  const validPassword = await bcrypt.compare(password, user.password);

  //Si la contraseña no es válida, retornamos un error
  if (!validPassword) {
    return res.status(400).json({ error: "Contraseña incorrecta" });
  }

  //Si la contraseña es válida, creamos un token de acceso
  // Crear un token de acceso
  const token = await createAccessToken({ id: result.rows[0].id });
  console.log(result);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return res.json(result.rows[0]);
  // return res.json({
  //   token: token,
  //   user: {
  //     id: user.id,
  //     name: user.name,
  //     email: user.email,
  //   },
  // });
};

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Crear un avatar por defecto basado en el email del usuario
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(
      email
    )}?d=identicon`;

    // Guardar el usuario en la base de datos
    const result = await pool.query(
      "INSERT INTO users (name, email, password, gravatar_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, gravatarUrl]
    );

    // Crear un token de acceso
    const token = await createAccessToken({ id: result.rows[0].id });
    console.log(result);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
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

    next(error);
  }
  // Manejar otros errores
  //   console.error("Error durante el registro:", error);
  //   return res.status(500).json({ error: "Error interno del servidor" });
  // }
};

export const logout = (req, res) => {
  //Cerramos la sesión eliminando la cookie
  res.clearCookie("token");
  return res.json({ message: "Sesión cerrada correctamente" });
};

export const getProfile = async (req, res) => {
  //Obtener el perfil del usuario autenticado
  const result = await pool.query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [req.userId]
  );
  return res.json(result.rows[0]);
};
