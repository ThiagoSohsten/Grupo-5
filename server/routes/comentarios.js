import express from "express";
import { getFeedComentarios, getComentariosUsuarios, criarComentario, getComentariosPost } from "../controllers/comentarios.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedComentarios);
router.get("/post/:postId/comentarios", verifyToken, getComentariosPost);
router.get("/:usuarioId/comentarios", verifyToken, getComentariosUsuarios);
router.post('/add', verifyToken, criarComentario);

    
export default router;
