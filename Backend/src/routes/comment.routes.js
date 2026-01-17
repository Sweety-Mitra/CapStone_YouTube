import express from "express";
import Comment from "../models/comment.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * GET comments by video (PUBLIC)
 */
router.get("/:videoId", async (req, res) => {
  const comments = await Comment.find({ videoId: req.params.videoId })
    .populate("userId", "username")
    .sort({ createdAt: -1 });

  res.json(comments);
});

/**
 * ADD comment (LOGIN REQUIRED)
 */
router.post("/", authMiddleware, async (req, res) => {
  const { text, videoId } = req.body;

  const comment = await Comment.create({
    text,
    videoId,
    userId: req.user.id,
  });

  const populated = await comment.populate("userId", "username");
  res.status(201).json(populated);
});

/**
 * UPDATE comment (OWNER ONLY)
 */
router.put("/:id", authMiddleware, async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment || comment.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  comment.text = req.body.text;
  await comment.save();

  const populated = await comment.populate("userId", "username");
  res.json(populated);
});

/**
 * DELETE comment (OWNER ONLY)
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment || comment.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await comment.deleteOne();
  res.json({ message: "Comment deleted" });
});

export default router;
