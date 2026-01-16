// This page reads the video ID from the URL
// and passes it to the details component

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoById } from "../api/videos";

const VideoPlayer = () => {
  // useParams reads values from the URL
  // If URL is /video/1 → id = "1"
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const data = await fetchVideoById(id);
        setVideo(data);
      } catch (error) {
        console.error("Failed to load video");
      }
    };

    loadVideo();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
  <div style={{ maxWidth: "900px", margin: "20px auto" }}>
    <video
      controls
      src={video.videoUrl}
      style={{ width: "100%", borderRadius: "8px" }}
    />

    <h2>{video.title}</h2>
    <p>{video.description}</p>
    <p>Channel: {video.uploader?.username}</p>
  </div>
);
};

export default VideoPlayer;
