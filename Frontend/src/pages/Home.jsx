import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import VideoCard from "../components/video/VideoCard";
import VideoGrid from "../components/video/VideoGrid";
import FilterBar from "../components/video/FilterBar";
import { fetchAllVideos } from "../api/videos";

const Home = () => {
  const categories = ["All", "Coding", "Gaming", "Travel", "Education", "Vlogs", "Music", "Frontend", "Backend"];

  const [activeCategory, setActiveCategory] = useState("All");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  /* FETCH ALL VIDEOS ONCE */
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchAllVideos();
        setVideos(data);
      } catch {
        console.error("Failed to load videos");
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, []);

  /* FILTER BY CATEGORY + SEARCH */
  const filteredVideos = videos
    .filter((video) => {
      const matchesCategory =
        activeCategory === "All" || video.category === activeCategory;

      const matchesSearch =
        !searchQuery ||
        video.title.toLowerCase().includes(searchQuery) ||
        video.uploader?.username?.toLowerCase().includes(searchQuery);

      return matchesCategory && matchesSearch;
    })
    .slice(0, 20);

  if (loading) {
    return (
      <MainLayout>
        <p style={{ padding: "20px" }}>Loading videos...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <VideoGrid>
        {filteredVideos.length ? (
          filteredVideos.map((video) => (
            <VideoCard key={video._id} {...video} />
          ))
        ) : (
          <p style={{ padding: "20px", color: "#777" }}>
            No videos found
          </p>
        )}
      </VideoGrid>
    </MainLayout>
  );
};

export default Home;
