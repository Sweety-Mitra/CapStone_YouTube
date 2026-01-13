// It includes Header + Sidebar + Page Content

import { useState } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

const MainLayout = ({ children }) => {
  // State to control sidebar visibility
  const [showSidebar, setShowSidebar] = useState(true);

  // Toggle function passed to Header
  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <>
      {/* Header receives toggle function */}
      <Header onMenuClick={toggleSidebar} />

      <div style={{ display: "flex" }}>
        {/* Sidebar shown/hidden based on state */}
        {showSidebar && <Sidebar />}

        {/* Main page content */}
        <main style={{ padding: "1rem", flex: 1 }}>{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
