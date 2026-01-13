// This page shows the video feed with category filters and video grid

import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import VideoCard from "../components/video/VideoCard";
import VideoGrid from "../components/video/VideoGrid";
import FilterBar from "../components/video/FilterBar";
import { mockVideos } from "../data/mockVideos";

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

  // Filter videos based on selected category
  const filteredVideos =
    activeCategory === "All"
      ? mockVideos
      : mockVideos.filter(
          (video) => video.category === activeCategory
        );

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
          <VideoCard key={video.id} {...video} />
        ))}
      </VideoGrid>
    </MainLayout>
  );
};

export default Home;
