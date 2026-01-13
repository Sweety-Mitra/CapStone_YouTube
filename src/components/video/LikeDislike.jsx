// This component handles like and dislike functionality
// Currently managed using React state (no backend yet)

import { useState } from "react";

const LikeDislike = () => {
  // State to track likes and dislikes
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  return (
    <div className="like-dislike">
      {/* Like button */}
      <button onClick={() => setLikes(likes + 1)}>
        👍 {likes}
      </button>

      {/* Dislike button */}
      <button onClick={() => setDislikes(dislikes + 1)}>
        👎 {dislikes}
      </button>
    </div>
  );
};

export default LikeDislike;
