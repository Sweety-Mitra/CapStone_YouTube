// Routes for channel APIs

import express from "express";
import {
  createChannel,
  getChannelById,
  getChannelVideos,
} from "../controllers/channel.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create channel (protected)
router.post("/", authMiddleware, createChannel);

// Get channel details
router.get("/:id", getChannelById);

// Get channel videos
router.get("/:id/videos", getChannelVideos);

export default router;
