import { NavLink } from "react-router-dom";
import {
  MdHomeFilled,
  MdOutlineVideoLibrary,
  MdSubscriptions,
  MdHistory,
  MdPlaylistPlay,
  MdWatchLater,
  MdThumbUp,
} from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <aside className="yt-sidebar">
      {/* Home */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "sidebar-item active" : "sidebar-item"
        }
      >
        <MdHomeFilled className="icon" />
        Home
      </NavLink>

      {/* Subscriptions */}
      <NavLink to="/subscriptions" className="sidebar-item">
        <MdSubscriptions className="icon" />
        Subscriptions
      </NavLink>

      <hr className="sidebar-divider" />

      {/* Library */}
      <NavLink to="/library" className="sidebar-item">
        <MdOutlineVideoLibrary className="icon" />
        Library
      </NavLink>

      <NavLink to="/history" className="sidebar-item">
        <MdHistory className="icon" />
        History
      </NavLink>

      <NavLink to="/playlist" className="sidebar-item">
        <MdPlaylistPlay className="icon" />
        Playlist
      </NavLink>

      <NavLink to="/watch-later" className="sidebar-item">
        <MdWatchLater className="icon" />
        Watch Later
      </NavLink>

      <NavLink to="/liked" className="sidebar-item">
        <MdThumbUp className="icon" />
        Liked Videos
      </NavLink>
    </aside>
  );
};

export default Sidebar;
