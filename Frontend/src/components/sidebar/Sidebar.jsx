// Sidebar.jsx
// This component represents the left navigation sidebar (like YouTube)
// It shows navigation links and highlights the active page

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="yt-sidebar">
      {/* Navigation link to Home */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "sidebar-item active" : "sidebar-item"
        }
      >
        🏠 Home
      </NavLink>

      {/* Subscriptions section */}
      <NavLink
        to="/subscriptions"
        className="sidebar-item"
      >
        📺 Subscriptions
      </NavLink>

      {/* Library section */}
      <NavLink
        to="/library"
        className="sidebar-item"
      >
        📚 Library
      </NavLink>

      {/* Channel page (user channel) */}
      <NavLink
        to="/channel"
        className={({ isActive }) =>
          isActive ? "sidebar-item active" : "sidebar-item"
        }
      >
        👤 Your Channel
      </NavLink>
    </aside>
  );
};

export default Sidebar;
