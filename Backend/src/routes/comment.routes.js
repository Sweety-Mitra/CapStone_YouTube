// Routes for comment APIs

import express from "express";
import {
  addComment,
  getCommentsByVideo,
  editComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Fetch comments for a video
router.get("/video/:videoId", getCommentsByVideo);

// Protected routes
router.post("/", authMiddleware, addComment);
router.put("/:id", authMiddleware, editComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
