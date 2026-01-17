import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdMenu, MdSearch } from "react-icons/md";

const Header = ({ onMenuClick }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchText.trim()) return;
    navigate(`/?search=${searchText}`);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <header className="yt-header">
      {/* LEFT */}
      <div className="yt-header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <MdMenu />
        </button>

        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-icon">▶</span>
          <span>YouTube</span>
        </div>
      </div>

      {/* CENTER */}
      <div className="yt-header-center">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>
          <MdSearch />
        </button>
      </div>

      {/* RIGHT */}
      <div className="yt-header-right">
        {user ? (
          <>
            <span className="username">{user.username}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="signin-btn" onClick={() => navigate("/login")}>
            Sign in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
