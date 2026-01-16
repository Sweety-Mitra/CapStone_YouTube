import express from "express";
import Channel from "../models/channel.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * CREATE CHANNEL
 * POST /api/channels
 * Protected
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const channel = await Channel.create({
      channelName: req.body.channelName,
      description: req.body.description,
      owner: req.user.id,
    });

    res.status(201).json(channel);
  } catch (err) {
    res.status(400).json({ message: "Failed to create channel" });
  }
});

/**
 * GET MY CHANNEL
 * GET /api/channels/me
 * Protected
 */
router.get("/me", authMiddleware, async (req, res) => {
  const channel = await Channel.findOne({ owner: req.user.id });
  res.json(channel);
});

export default router;
