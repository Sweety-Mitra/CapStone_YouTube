// This page represents the user's channel page
// User can CREATE, READ, UPDATE, and DELETE videos (CRUD)
// This is frontend-only using React state (mock data)
// Backend integration will replace this later

import { useState } from "react";
import MainLayout from "../layout/MainLayout";

const Channel = () => {
  // ===============================
  // STATE: list of videos uploaded by the user
  // ===============================
  const [videos, setVideos] = useState([
    { id: 1, title: "My First Video" },
    { id: 2, title: "React Tutorial" },
  ]);

  // ===============================
  // STATE: input value for new video title
  // ===============================
  const [newTitle, setNewTitle] = useState("");

  // ===============================
  // CREATE: Add a new video
  // ===============================
  const addVideo = () => {
    // Prevent empty titles
    if (!newTitle.trim()) return;

    // Add new video to list
    setVideos([
      ...videos,
      {
        id: Date.now(), // unique id
        title: newTitle,
      },
    ]);

    // Clear input field
    setNewTitle("");
  };

  // ===============================
  // DELETE: Remove a video
  // ===============================
  const deleteVideo = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  // ===============================
  // UPDATE: Edit video title
  // ===============================
  const editVideo = (id) => {
    const updatedTitle = prompt("Enter new video title");

    // Cancel if empty or user pressed cancel
    if (!updatedTitle) return;

    setVideos(
      videos.map((video) =>
        video.id === id
          ? { ...video, title: updatedTitle }
          : video
      )
    );
  };

  // ===============================
  // UI RENDER
  // ===============================
  return (
    <MainLayout>
      <h2>Your Channel</h2>
      <p>Manage your uploaded videos</p>

      {/* ========================= */}
      {/* ADD NEW VIDEO SECTION */}
      {/* ========================= */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter new video title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={addVideo} style={{ marginLeft: "0.5rem" }}>
          Add Video
        </button>
      </div>

      {/* ========================= */}
      {/* VIDEO LIST SECTION */}
      {/* ========================= */}
      {videos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        <ul>
          {videos.map((video) => (
            <li key={video.id} style={{ marginBottom: "0.5rem" }}>
              {/* Video title */}
              <strong>{video.title}</strong>

              {/* Edit & Delete buttons */}
              <button
                onClick={() => editVideo(video.id)}
                style={{ marginLeft: "0.5rem" }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteVideo(video.id)}
                style={{ marginLeft: "0.5rem" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </MainLayout>
  );
};

export default Channel;
