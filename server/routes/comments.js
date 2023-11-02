import express from "express";
import { createComment, getPostComments, likeComment, deleteComment } from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Create */
router.post("/", verifyToken, createComment) 

/* READ */
router.get("/:postId", verifyToken, getPostComments);
// router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeComment);

/* DELETE */
router.delete("/:id/:postId", verifyToken, deleteComment)

export default router;
