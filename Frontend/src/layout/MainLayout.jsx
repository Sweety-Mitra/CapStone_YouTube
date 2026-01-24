// It includes Header + Sidebar + Page Content

import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

const MainLayout = ({ children }) => {
  // State to control sidebar visibility
  const [showSidebar, setShowSidebar] = useState(
  window.innerWidth > 1024   // desktop open, mobile closed
);
  const [searchText, setSearchText] = useState("");

  // Toggle function passed to Header
  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  useEffect(() => {
  if (typeof window !== "undefined" && window.innerWidth <= 1024) {
    document.body.classList.toggle("sidebar-open", showSidebar);
  }
}, [showSidebar]);

  return (
    <>
      <Header
        onMenuClick={toggleSidebar}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <div
        className={`layout-wrapper ${
          showSidebar ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <Sidebar onItemClick={() => setShowSidebar(false)} />

        <main style={{ padding: "1rem", flex: 1 }}>
          {children}
        </main>
      </div>
    </>
  );
};

export default MainLayout;
