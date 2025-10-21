import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";

const router = Router();

// Aqui van a estar las rutas relacionadas con la autenticación

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.get("/profile", getProfile);

export default router;
