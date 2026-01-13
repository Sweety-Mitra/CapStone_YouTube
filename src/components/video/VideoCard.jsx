const VideoCard = ({ title, channel, views }) => {
  return (
    <div style={{ width: "250px" }}>
      <div style={{ height: "140px", background: "#ccc" }} />
      <h4>{title}</h4>
      <p>{channel}</p>
      <span>{views} views</span>
    </div>
  );
};

export default VideoCard;
