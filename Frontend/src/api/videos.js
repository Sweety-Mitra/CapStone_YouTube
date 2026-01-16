// All video-related API calls

import API from "./axios";

// Get all videos (Home page)
export const fetchAllVideos = async () => {
  const res = await API.get("/videos");
  return res.data;
};

// Get single video (Player page)
export const fetchVideoById = async (id) => {
  const res = await API.get(`/videos/${id}`);
  return res.data;
};

export const fetchChannelVideos = async (channelId) => {
  const res = await API.get(`/videos/channel/${channelId}`);
  return res.data;
};

export const updateVideo = async (id, data) => {
  const res = await API.put(`/videos/${id}`, data);
  return res.data;
};

export const deleteVideo = async (id) => {
  await API.delete(`/videos/${id}`);
};

export const searchVideos = async (query) => {
  const res = await API.get(`/videos/search/${query}`);
  return res.data;
};