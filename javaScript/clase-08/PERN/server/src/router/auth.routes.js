//import { Router } from "express";
import Router from "express-promise-router";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";

import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// Aqui van a estar las rutas relacionadas con la autenticación

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.get("/profile", isAuth, getProfile);

export default router;
