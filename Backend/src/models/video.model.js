// Defines how videos are stored in MongoDB

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    videoUrl: {
      type: String,
      required: true,
    },

    thumbnailUrl: {
      type: String,
      default: "",
    },

    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },

    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      default: "All",
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
