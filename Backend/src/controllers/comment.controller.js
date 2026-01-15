// Handles comment CRUD operations

import Comment from "../models/comment.model.js";

// ===============================
// ADD COMMENT
// ===============================
export const addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const comment = await Comment.create({
      videoId,
      text,
      userId: req.user,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

// ===============================
// GET COMMENTS FOR A VIDEO
// ===============================
export const getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({
      videoId: req.params.videoId,
    }).populate("userId", "username");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

// ===============================
// EDIT COMMENT
// ===============================
export const editComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only comment owner can edit
    if (comment.userId.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    comment.text = req.body.text || comment.text;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to edit comment" });
  }
};

// ===============================
// DELETE COMMENT
// ===============================
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only comment owner can delete
    if (comment.userId.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
