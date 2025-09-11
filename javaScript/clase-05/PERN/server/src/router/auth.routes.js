import { Router } from "express";

const router = Router();

// Aqui van a estar las rutas relacionadas con la autenticación

router.post("/login", (req, res) =>
  res.send("Iniciando sesión con datos: " + JSON.stringify(req.body))
);

router.post("/register", (req, res) =>
  res.send("Registrando usuario con exito: " + JSON.stringify(req.body))
);

router.post("/logout", (req, res) => res.send("Cerrando sesión"));

router.get("/profile", (req, res) => res.send("Obteniendo perfil de usuario"));

export default router;
