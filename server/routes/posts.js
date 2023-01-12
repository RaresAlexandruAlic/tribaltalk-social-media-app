import { getFeedPosts, getUserPosts, likePost } from "../controllers/postsController.js"

import express from 'express';
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);

export default router;
