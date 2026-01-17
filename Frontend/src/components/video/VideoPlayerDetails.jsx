import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

import { fetchCommentsByVideo } from "../../api/comments";
import { fetchVideoById } from "../../api/videos";

import "./VideoPlayerDetails.css";

/* ---------- SESSION STATE (MEMORY ONLY) ---------- */

const sessionComments = {};

/* ---------- ICONS ---------- */
const ThumbUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M7 10v10M17 10h-4l1-5-6 6v9h7l3-7v-3a2 2 0 0 0-2-2Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ThumbDownIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M17 14V4M7 14h4l-1 5 6-6V4H9L6 11v3a2 2 0 0 0 2 2Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const VideoPlayerDetails = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  /* SIDEBAR STATE (THIS IS WHY MENU NOW WORKS) */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const commentsRef = useRef(sessionComments);

  /* LOAD VIDEO */
  useEffect(() => {
    if (!id) return;

    fetchVideoById(id)
      .then((res) => {
        const v = res?.data ?? res ?? null;
        setVideo(v);
        setLikeCount(v?.likes || 0);
        setDislikeCount(v?.dislikes || 0);
      })
      .catch(() => setVideo(null));
  }, [id]);

  /* LOAD COMMENTS */
  useEffect(() => {
    if (!id) return;

    fetchCommentsByVideo(id)
      .then((data) => {
        const sessionData = commentsRef.current[id] || [];
        setComments([...sessionData, ...(data || [])]);
      })
      .catch(() => setComments(commentsRef.current[id] || []));
  }, [id]);

  /* ADD COMMENT */
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const tempComment = {
      _id: crypto.randomUUID(),
      text: newComment,
      userId: { username: user?.username || "guest" },
      session: true,
    };

    commentsRef.current[id] = [
      tempComment,
      ...(commentsRef.current[id] || []),
    ];

    setComments((prev) => [tempComment, ...prev]);
    setNewComment("");
  };

  return (
    <>
      {/* HEADER */}
      <Header onMenuClick={() => setSidebarOpen((v) => !v)} />

      <div style={{ display: "flex" }}>
        {/* SIDEBAR */}
        {sidebarOpen && <Sidebar />}

        {/* PAGE CONTENT */}
        <div className="vp-root">
          <div className="vp-card">

            {/* VIDEO */}
            <div className="vp-video">
              {video?.videoUrl ? (
                <video controls playsInline>
                  <source src={video.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <div className="vp-video-unavailable">
                  Video unavailable
                </div>
              )}
            </div>

            {/* META */}
            <div className="vp-meta">
              <div className="vp-title">
                <h2>{video?.title || "Untitled video"}</h2>
                <span>{video?.uploader?.username || "Unknown uploader"}</span>
              </div>

              <div className="vp-reactions">
                <button
                  className={`vp-react ${liked ? "active" : ""}`}
                  onClick={() => {
                    if (disliked) {
                      setDisliked(false);
                      setDislikeCount((c) => Math.max(0, c - 1));
                    }
                    setLiked((v) => {
                      setLikeCount((c) => (v ? c - 1 : c + 1));
                      return !v;
                    });
                  }}
                >
                  <ThumbUpIcon />
                  <span>{likeCount}</span>
                </button>

                <button
                  className={`vp-react ${disliked ? "active" : ""}`}
                  onClick={() => {
                    if (liked) {
                      setLiked(false);
                      setLikeCount((c) => Math.max(0, c - 1));
                    }
                    setDisliked((v) => {
                      setDislikeCount((c) => (v ? c - 1 : c + 1));
                      return !v;
                    });
                  }}
                >
                  <ThumbDownIcon />
                  <span>{dislikeCount}</span>
                </button>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="vp-desc">
              {video?.description || "No description available."}
            </div>

            {/* COMMENTS */}
            <div className="vp-comments">
              <h4>{comments.length} replies</h4>

              <div className="vp-input">
                <input
                  placeholder="Write a reply…"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>Send</button>
              </div>

              {comments.map((c) => (
                <div key={c._id} className="vp-comment">
                  <span className="vp-user">{c.userId?.username}</span>
                  <span className="vp-text">{c.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayerDetails;
