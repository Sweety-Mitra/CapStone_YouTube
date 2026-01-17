import { Link } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ _id, title, thumbnailUrl, uploader, views }) => {
  return (
    <Link to={`/video/${_id}`} className="video-card-link">
      <div className="video-card">
        <img
          src={thumbnailUrl || "https://via.placeholder.com/250x140"}
          alt={title}
          className="video-thumb"
        />

        <h4 className="video-title">{title}</h4>
        <p className="video-uploader">{uploader?.username}</p>
        <span className="video-views">{views} views</span>
      </div>
    </Link>
  );
};

export default VideoCard;
