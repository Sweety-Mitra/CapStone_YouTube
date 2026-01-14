// This component finds the correct video
// and displays all its details

import { useState } from "react";
import { mockVideos } from "../../data/mockVideos";
import LikeDislike from "./LikeDislike";
import Comments from "./Comments";

const VideoPlayerDetails = ({ videoId }) => {
  // Find the video whose id matches the URL id
  const video = mockVideos.find(
    (video) => video.id === videoId
  );

  // Safety check (important!)
  if (!video) {
    return <p>Video not found</p>;
  }

  return (
    <div>
      {/* Video Player */}
      <video width="100%" height="400" controls>
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video title */}
      <h2>{video.title}</h2>

      {/* Channel name */}
      <p><strong>{video.channel}</strong></p>

      {/* Like / Dislike buttons */}
      <LikeDislike />

      {/* Description */}
      <p>{video.description}</p>

      {/* Comments */}
      <Comments />
    </div>
  );
};

export default VideoPlayerDetails;
