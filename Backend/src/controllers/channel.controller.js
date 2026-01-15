// Handles channel-related logic

import Channel from "../models/channel.model.js";
import Video from "../models/video.model.js";

// ===============================
// CREATE CHANNEL (JWT required)
// ===============================
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;

    if (!channelName) {
      return res.status(400).json({ message: "Channel name is required" });
    }

    // Prevent multiple channels for same user
    const existingChannel = await Channel.findOne({
      owner: req.user,
    });

    if (existingChannel) {
      return res
        .status(400)
        .json({ message: "User already has a channel" });
    }

    const channel = await Channel.create({
      channelName,
      description,
      channelBanner,
      owner: req.user,
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: "Failed to create channel" });
  }
};

// ===============================
// GET CHANNEL DETAILS
// ===============================
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate(
      "owner",
      "username"
    );

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch channel" });
  }
};

// ===============================
// GET VIDEOS OF A CHANNEL
// ===============================
export const getChannelVideos = async (req, res) => {
  try {
    const videos = await Video.find({
      uploader: req.params.id,
    });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch channel videos" });
  }
};
