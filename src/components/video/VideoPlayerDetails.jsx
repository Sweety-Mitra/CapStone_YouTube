import LikeDislike from "./LikeDislike";
import Comments from "./Comments";

const VideoPlayerDetails = () => {
  return (
    <div>
      {/* Video player (HTML5 video for now) */}
      <video
        width="100%"
        height="400"
        controls
      >
        {/* Sample video URL (temporary) */}
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Video title */}
      <h2>Learn React in 30 Minutes</h2>

      {/* Channel name */}
      <p><strong>Code with John</strong></p>

      {/* Like / Dislike buttons */}
      <LikeDislike />

      {/* Video description */}
      <p>
        This video helps you get started with React quickly.
        Perfect for beginners.
      </p>

      {/* Comments section */}
      <Comments />
    </div>
  );
};

export default VideoPlayerDetails;
