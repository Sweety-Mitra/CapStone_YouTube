// Displays video details + real comments (backend)

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LikeDislike from "../video/LikeDislike";
import {
  fetchCommentsByVideo,
  addComment,
  editComment,
  deleteComment,
} from "../../api/comments";
import { fetchVideoById } from "../../api/videos";

<h1 style={{ color: "red" }}>VIDEO PLAYER DETAILS LOADED</h1>

const VideoPlayerDetails = () => {
  const { id } = useParams(); // video id from URL
  const user = JSON.parse(localStorage.getItem("user"));

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Load video
  useEffect(() => {
    const loadVideo = async () => {
      const data = await fetchVideoById(id);
      setVideo(data);
    };
    loadVideo();
  }, [id]);

  // Load comments
  useEffect(() => {
    const loadComments = async () => {
      const data = await fetchCommentsByVideo(id);
      setComments(data);
    };
    loadComments();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto" }}>
      {/* Video Player */}
      <video width="100%" height="400" controls>
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h2>{video.title}</h2>

      <p>
        <strong>Channel: {video.uploader?.username}</strong>
      </p>

      <LikeDislike />

      <p>{video.description}</p>

      <hr />

      <p style={{ color: "red" }}>
        DEBUG USER: {user ? user.username : "NO USER"}
      </p>


      {/* Comments Section */}
      <h3>Comments</h3>

      {/* Add Comment */}
      {user && (
        <div>
          <input
            type="text"
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={async () => {
              if (!newComment) return;

              const comment = await addComment({
                videoId: id,
                text: newComment,
              });

              setComments([comment, ...comments]);
              setNewComment("");
            }}
          >
            Comment
          </button>
        </div>
      )}

      {/* Show Comments */}
      {comments.map((c) => (
        <div key={c._id} style={{ marginTop: "10px" }}>
          <strong>{c.userId?.username}</strong>

          {editingId === c._id ? (
            <>
              <input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <button
                onClick={async () => {
                  const updated = await editComment(c._id, {
                    text: editingText,
                  });

                  setComments(
                    comments.map((cm) =>
                      cm._id === c._id ? updated : cm
                    )
                  );

                  setEditingId(null);
                }}
              >
                Save
              </button>
            </>
          ) : (
            <p>{c.text}</p>
          )}

          {/* Edit/Delete only for owner */}
          {user?.id === (c.userId?._id || c.userId) && (
            <>
              <button
                onClick={() => {
                  setEditingId(c._id);
                  setEditingText(c.text);
                }}
              >
                Edit
              </button>

              <button
                onClick={async () => {
                  await deleteComment(c._id);
                  setComments(
                    comments.filter((cm) => cm._id !== c._id)
                  );
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoPlayerDetails;
