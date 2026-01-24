import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdMenu,
  MdSearch,
  MdAddCircleOutline,
} from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle";

const Header = ({ onMenuClick }) => {
  const [searchText, setSearchText] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const createRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("user"));
  const user = auth?.user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  /* CLOSE DROPDOWNS ON OUTSIDE CLICK */
  useEffect(() => {
    const close = (e) => {
      if (
        !createRef.current?.contains(e.target) &&
        !profileRef.current?.contains(e.target)
      ) {
        setOpenCreate(false);
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="yt-header">
      {/* LEFT */}
      <div className="yt-header-left">
        <button className="menu-btn" onClick={() => onMenuClick?.()}>
          <MdMenu />
        </button>

        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube"
            className="yt-logo"
            // style={{ height: "20px" }}
          />
        </div>
      </div>

      {/* CENTER */}
      <div className="yt-header-center">
        <input
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            const value = e.target.value;
            setSearchText(value);
            value ? navigate(`/?search=${value}`) : navigate("/");
          }}
        />
        <button>
          <MdSearch />
        </button>
      </div>

      {/* RIGHT */}
      <div className="yt-header-right">
        <ThemeToggle />

        {user ? (
          <>
            {/* CREATE DROPDOWN */}
            <div className="create-wrapper" ref={createRef}>
              <button
                className="create-btn"
                onClick={() => {
                  setOpenCreate((v) => !v);
                  setOpenProfile(false);
                }}
              >
                <MdAddCircleOutline />
                <span>Create</span>
              </button>

              {openCreate && (
                <div className="create-menu">
                  <button
                    onClick={() => {
                      setOpenCreate(false);
                      navigate("/channel?upload=true");
                    }}
                  >
                    Upload video
                  </button>
                  <button
                    onClick={() => {
                      setOpenCreate(false);
                      navigate("/channel");
                    }}
                  >
                    View channel
                  </button>
                </div>
              )}
            </div>

            {/* PROFILE DROPDOWN */}
            <div className="profile-wrapper" ref={profileRef}>
              <button
                className="profile-btn"
                onClick={() => {
                  setOpenProfile((v) => !v);
                  setOpenCreate(false);
                }}
              >
                <img
                  src={user.avatar || "https://i.pravatar.cc/40"}
                  alt="avatar"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </button>


              {openProfile && (
                <div className="profile-menu">
                  {/* TOP USER INFO */}
                  <div className="profile-top">
                    <div>
                      <strong>{user.username}</strong>
                      <p>{user.email}</p>
                    </div>
                  </div>

                  <hr />

                  {/* ACTIONS */}
                  <button
                    onClick={() => {
                      setOpenProfile(false);
                      navigate("/channel");
                    }}
                  >
                    My Channel
                  </button>

                  <button className="logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}

            </div>
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
