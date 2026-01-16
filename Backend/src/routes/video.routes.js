import express from "express";
import Video from "../models/video.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * GET ALL VIDEOS (HOME PAGE)
 * GET /api/videos
 */
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("uploader", "username")
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
});

/**
 * GET VIDEOS BY CHANNEL
 * GET /api/videos/channel/:channelId
 */
router.get("/channel/:channelId", async (req, res) => {
  try {
    const videos = await Video.find({
      channelId: req.params.channelId,
    }).populate("uploader", "username");

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch channel videos" });
  }
});

/**
 * SEARCH VIDEOS BY TITLE
 * GET /api/videos/search/:query
 */
router.get("/search/:query", async (req, res) => {
  try {
    const videos = await Video.find({
      title: { $regex: req.params.query, $options: "i" },
    }).populate("uploader", "username");

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
});

/**
 * GET SINGLE VIDEO BY ID (VIDEO PLAYER)
 * GET /api/videos/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("uploader", "username");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch video" });
  }
});

/**
 * UPDATE VIDEO (OWNER ONLY)
 * PUT /api/videos/:id
 */
router.put("/:id", authMiddleware, async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video || video.uploader.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  video.title = req.body.title || video.title;
  video.description = req.body.description || video.description;
  await video.save();

  res.json(video);
});

/**
 * DELETE VIDEO (OWNER ONLY)
 * DELETE /api/videos/:id
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video || video.uploader.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await video.deleteOne();
  res.json({ message: "Video deleted" });
});

/**
 * LIKE VIDEO
 * POST /api/videos/:id/like
 */
router.post("/:id/like", authMiddleware, async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.likes += 1;
  await video.save();
  res.json(video);
});

/**
 * DISLIKE VIDEO
 * POST /api/videos/:id/dislike
 */
router.post("/:id/dislike", authMiddleware, async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.dislikes += 1;
  await video.save();
  res.json(video);
});

export default router;
