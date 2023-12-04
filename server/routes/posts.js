import express from "express";
import { getFeedPosts, getPostsUsuario, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:usuarioId/posts", verifyToken, getPostsUsuario);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
    
export default router;
