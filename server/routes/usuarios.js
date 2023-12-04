import express from "express";
import {
  getUsuario,
  getAmigosUsuario,
  adicionarRemoverAmigo,
} from "../controllers/usuarios.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUsuario);
router.get("/:id/amigos", verifyToken, getAmigosUsuario);

/* UPDATE */
router.patch("/:id/:AmigoId", verifyToken, adicionarRemoverAmigo);

export default router;
