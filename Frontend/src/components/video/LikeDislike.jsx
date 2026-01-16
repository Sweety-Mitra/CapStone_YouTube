import { useState } from "react";
import API from "../../api/axios";

const LikeDislike = ({ videoId, likes, dislikes }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  return (
    <div>
      <button
        onClick={async () => {
          const res = await API.post(`/videos/${videoId}/like`);
          setLikeCount(res.data.likes);
        }}
      >
        👍 {likeCount}
      </button>

      <button
        onClick={async () => {
          const res = await API.post(`/videos/${videoId}/dislike`);
          setDislikeCount(res.data.dislikes);
        }}
      >
        👎 {dislikeCount}
      </button>
    </div>
  );
};

export default LikeDislike;
