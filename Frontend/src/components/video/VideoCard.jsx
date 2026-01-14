// This component represents a clickable video card
// Clicking it navigates to the video player page

import { Link } from "react-router-dom";

const VideoCard = ({ id, title, channel, views }) => {
  return (
    <Link to={`/video/${id}`} style={{ textDecoration: "none", color: "black" }}>
      <div style={{ width: "250px", cursor: "pointer" }}>
        {/* Thumbnail placeholder */}
        <div style={{ height: "140px", background: "#ccc" }} />

        <h4>{title}</h4>
        <p>{channel}</p>
        <span>{views} views</span>
      </div>
    </Link>
  );
};

export default VideoCard;
