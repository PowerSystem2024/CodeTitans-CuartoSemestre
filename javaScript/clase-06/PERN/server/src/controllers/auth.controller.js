// Controlador para la autenticación

export const login = (req, res) =>
  res.send("Iniciando sesión con datos: " + JSON.stringify(req.body));

export const register = (req, res) =>
  res.send("Registrando usuario con exito: " + JSON.stringify(req.body));

export const logout = (req, res) => res.send("Cerrando sesión");

export const getProfile = (req, res) =>
  res.send("Obteniendo perfil de usuario");
