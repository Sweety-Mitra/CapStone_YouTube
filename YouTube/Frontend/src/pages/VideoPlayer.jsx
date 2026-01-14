// This page reads the video ID from the URL
// and passes it to the details component

import { useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import VideoPlayerDetails from "../components/video/VideoPlayerDetails";

const VideoPlayer = () => {
  // useParams reads values from the URL
  // If URL is /video/1 → id = "1"
  const { id } = useParams();

  return (
    <MainLayout>
      {/* Pass the video id to child component */}
      <VideoPlayerDetails videoId={id} />
    </MainLayout>
  );
};

export default VideoPlayer;
