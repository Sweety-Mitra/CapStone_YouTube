const VideoGrid = ({ children }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
      }}
    >
      {children}
    </div>
  );
};

export default VideoGrid;
