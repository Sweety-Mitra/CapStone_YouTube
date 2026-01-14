import { useState } from "react";

const Header = ({ onMenuClick }) => {
  // State to store search input value
  const [searchText, setSearchText] = useState("");

  // Function triggered when user clicks search
  const handleSearch = () => {
    // For now, we only log the search text
    // Later this will connect to backend search API
    console.log("Searching for:", searchText);
  };

  return (
    <header className="yt-header">
      {/* LEFT SECTION: Hamburger + Logo */}
      <div className="yt-header-left">
        {/* Hamburger menu icon */}
        <button className="menu-btn" onClick={onMenuClick}>
          ☰
        </button>

        {/* YouTube Logo */}
        <h2 className="logo">YouTube</h2>
      </div>

      {/* CENTER SECTION: Search bar */}
      <div className="yt-header-center">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button onClick={handleSearch}>🔍</button>
      </div>

      {/* RIGHT SECTION: Sign In */}
      <div className="yt-header-right">
        <button className="signin-btn">Sign In</button>
      </div>
    </header>
  );
};

export default Header;
