import MainLayout from "../layout/MainLayout";
import VideoCard from "../components/video/VideoCard";
import VideoGrid from "../components/video/VideoGrid";
import { mockVideos } from "../data/mockVideos";

const Home = () => {
  return (
    <MainLayout>
      <VideoGrid>
        {mockVideos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </VideoGrid>
    </MainLayout>
  );
};

export default Home;
