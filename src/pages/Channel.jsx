// This page represents the user's channel
// User can manage (add, edit, delete) videos here
import { useState } from "react";
import MainLayout from "../layout/MainLayout";

const Channel = () => {
  // Mock videos uploaded by user
  const [videos, setVideos] = useState([
    { id: 1, title: "My First Video" },
    { id: 2, title: "React Tutorial" },
  ]);

  return (
    <MainLayout>
      <h2>Your Channel</h2>

      <ul>
        {videos.map((video) => (
          <li key={video.id}>{video.title}</li>
        ))}
      </ul>
    </MainLayout>
  );
};

export default Channel;
