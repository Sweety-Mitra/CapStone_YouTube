// Handles all video-related logic

import Video from "../models/video.model.js";

// ===============================
// GET ALL VIDEOS (Home Page)
// ===============================
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("uploader", "username");
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};

// ===============================
// GET SINGLE VIDEO (Video Player)
// ===============================
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate(
      "uploader",
      "username"
    );

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch video" });
  }
};

// ===============================
// CREATE VIDEO (Channel Page)
// ===============================
export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, category } = req.body;

    if (!title || !videoUrl) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      uploader: req.user, // from JWT middleware
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: "Failed to create video" });
  }
};

// ===============================
// UPDATE VIDEO
// ===============================
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Only uploader can edit
    if (video.uploader.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    Object.assign(video, req.body);
    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: "Failed to update video" });
  }
};

// ===============================
// DELETE VIDEO
// ===============================
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (video.uploader.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await video.deleteOne();
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete video" });
  }
};
