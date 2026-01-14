// It includes Header + Sidebar + Page Content

import { useState } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

const MainLayout = ({ children }) => {
  // State to control sidebar visibility
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchText, setSearchText] = useState("");

  // Toggle function passed to Header
  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <>
      <Header
        onMenuClick={toggleSidebar}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <div style={{ display: "flex" }}>
        {showSidebar && <Sidebar />}

        <main style={{ padding: "1rem", flex: 1 }}>
          {children}
        </main>
      </div>
    </>
  );
};

export default MainLayout;
