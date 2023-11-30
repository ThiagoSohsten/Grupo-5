import express from "express";
import { getFeedComments, getUserComments, createComment, getPostComments } from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedComments);
router.get("/post/:postId/comments", verifyToken, getPostComments);
router.get("/:userId/comments", verifyToken, getUserComments);
router.post('/add', verifyToken, createComment);

    
export default router;
