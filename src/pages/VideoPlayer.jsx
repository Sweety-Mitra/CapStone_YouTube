// This page displays a selected video and its details
// For now, we use mock data and frontend-only logic

import MainLayout from "../layout/MainLayout";
import VideoPlayerDetails from "../components/video/VideoPlayerDetails";

const VideoPlayer = () => {
  return (
    <MainLayout>
      {/* Wrapper for video player page */}
      <div className="video-player-page">
        <VideoPlayerDetails />
      </div>
    </MainLayout>
  );
};

export default VideoPlayer;
