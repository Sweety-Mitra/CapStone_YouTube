// All comment-related API calls

import API from "./axios";

// Fetch comments for a video
export const fetchCommentsByVideo = async (videoId) => {
  const res = await API.get(`/comments/video/${videoId}`);
  return res.data;
};

// Add a new comment
export const addComment = async (data) => {
  const res = await API.post("/comments", data);
  return res.data;
};

// Edit a comment
export const editComment = async (id, data) => {
  const res = await API.put(`/comments/${id}`, data);
  return res.data;
};

// Delete a comment
export const deleteComment = async (id) => {
  await API.delete(`/comments/${id}`);
};
