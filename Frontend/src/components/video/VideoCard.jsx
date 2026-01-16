// Clickable video card
// Navigates to video player page using real backend data

import { Link } from "react-router-dom";

const VideoCard = ({ _id, title, thumbnailUrl, uploader, views }) => {
  return (
    <Link
      to={`/video/${_id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div style={{ width: "250px", cursor: "pointer" }}>
        {/* Thumbnail */}
        <img
          src={thumbnailUrl || "https://via.placeholder.com/250x140"}
          alt={title}
          style={{ width: "100%", height: "140px", objectFit: "cover" }}
        />

        <h4>{title}</h4>
        <p>{uploader?.username}</p>
        <span>{views} views</span>
      </div>
    </Link>
  );
};

export default VideoCard;
