// This page shows the video feed with category filters and video grid

import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import VideoCard from "../components/video/VideoCard";
import VideoGrid from "../components/video/VideoGrid";
import FilterBar from "../components/video/FilterBar";
import { fetchAllVideos } from "../api/videos";


const Home = () => {
  // List of filter categories (minimum 6 as required)
  const categories = [
    "All",
    "Coding",
    "Gaming",
    "Music",
    "Education",
    "News",
  ];

  // State to track selected category
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [videos, setVideos] = useState([]);

  // Fetch videos from backend
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchAllVideos();
        setVideos(data);
      } catch (error) {
        console.error("Failed to load videos");
      }
    };

    loadVideos();
  }, []);

  const query = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    if (query) {
      searchVideos(query).then(setVideos);
    }
  }, [query]);

  // Filter videos by category
  const filteredVideos =
    activeCategory === "All"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  return (
    <MainLayout>
      {/* Filter buttons */}
      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Video grid */}
      <VideoGrid>
        {filteredVideos.map((video) => (
          <VideoCard key={video._id} {...video} />
        ))}
      </VideoGrid>
    </MainLayout>
  );
};

export default Home;
