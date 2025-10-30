//import { Router } from "express";
import Router from "express-promise-router";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";

import { isAuth } from "../middlewares/auth.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { validateSchema } from "../middlewares/validate.middleware.js";

const router = Router();

// Rutas relacionadas con la autenticación

router.post("/login", validateSchema(loginSchema), login);

router.post("/register", validateSchema(registerSchema), register);

router.post("/logout", logout);

router.get("/profile", isAuth, getProfile);

export default router;
