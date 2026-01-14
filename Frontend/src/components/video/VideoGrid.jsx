const VideoGrid = ({ children }) => {
  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {children}
    </div>
  );
};

export default VideoGrid;
