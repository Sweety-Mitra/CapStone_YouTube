import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

import { fetchCommentsByVideo } from "../../api/comments";
import { fetchVideoById } from "../../api/videos";

import { useNavigate } from "react-router-dom";
import { fetchAllVideos } from "../../api/videos";

import {
  addComment,
  editComment,
  deleteComment
} from "../../api/comments";


import "./VideoPlayerDetails.css";

/* ---------- SESSION STATE (MEMORY ONLY) ---------- */

// const sessionComments = {};

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

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M12 3v14M7 8l5-5 5 5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


const VideoPlayerDetails = () => {
  const { id } = useParams();
  const auth = JSON.parse(localStorage.getItem("user"));
  const currentUser = auth?.user;

  /* SIDEBAR STATE (THIS IS WHY MENU NOW WORKS) */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const [subscribed, setSubscribed] = useState(false);

  // const commentsRef = useRef(sessionComments);

  const navigate = useNavigate();
  const [recommended, setRecommended] = useState([]);

  /* LOAD VIDEO */
  useEffect(() => {
  if (!id) return;

  // RESET STATE FIRST
  setVideo(null);
  setComments([]);
  setLiked(false);
  setDisliked(false);

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
    .then(setComments)
    .catch(() => setComments([]));
  }, [id]);


  /* ADD COMMENT */
  const handleAddComment = async () => {
  if (!newComment.trim()) return;

  try {
    const comment = await addComment({
      videoId: id,
      text: newComment,
    });

    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  } catch {
    alert("Login required to comment");
  }
  };


  /* RECOMMENDED VIDEOS */

  useEffect(() => {
    fetchAllVideos()
      .then((data) => {
        // Remove current video from recommendations
        const filtered = data.filter((v) => v._id !== id);
        setRecommended(filtered.slice(0, 5)); // show 5 videos
      })
      .catch(() => setRecommended([]));
  }, [id]);


 return (
  <>
    <Header onMenuClick={() => setSidebarOpen((v) => !v)} />

    <div style={{ display: "flex" }}>
      {sidebarOpen && <Sidebar />}

      <div className="vp-root">
        <div className="vp-layout">

          {/* LEFT SIDE */}
          <div className="vp-main">
            <div className="vp-card">

              {/* VIDEO */}
              <div className="vp-video">
                {video?.videoUrl ? (
                  <video controls>
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

  {/* LEFT: TITLE + CHANNEL */}
  <div className="vp-title">
    <h2>{video?.title}</h2>

    <div className="vp-channel-row">
      <span className="vp-channel">
        {video?.uploader?.username}
      </span>

      <button
        className={`vp-subscribe ${subscribed ? "subscribed" : ""}`}
        onClick={() => setSubscribed((v) => !v)}
      >
        {subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  </div>

  {/* RIGHT: ACTIONS */}
  <div className="vp-reactions">

    <button
      className={`vp-react ${liked ? "active" : ""}`}
      onClick={() => {
        if (disliked) {
          setDisliked(false);
          setDislikeCount((c) => c - 1);
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
          setLikeCount((c) => c - 1);
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

    <button
      className="vp-react"
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
      }}
    >
      <ShareIcon />
      <span>Share</span>
    </button>

  </div>
</div>


              {/* DESCRIPTION */}
              <div className="vp-desc">
                {video?.description}
              </div>

              {/* COMMENTS */}
              <div className="vp-comments">
                <h4>{comments.length} replies</h4>

                {/* ADD COMMENT */}
                {currentUser ? (
                  <div className="vp-input">
                    <input
                      placeholder="Write a reply…"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={handleAddComment}>Send</button>
                  </div>
                ) : (
                  <p style={{ color: "#777", fontSize: "14px" }}>
                    Sign in to add a comment
                  </p>
                )}

                {comments.map((c) => (
                    <div key={c._id} className="vp-comment">

                      {/* LEFT */}
                      <div className="vp-comment-body">
                        <span className="vp-user">{c.userId?.username}</span>
                        <span className="vp-text">{c.text}</span>
                      </div>

                      {/* RIGHT */}
                      {currentUser?.id === c.userId?._id && (
                        <div className="vp-comment-actions">
                          <button
                            onClick={async () => {
                              const text = prompt("Edit comment", c.text);
                              if (!text) return;

                              const updated = await editComment(c._id, { text });
                              setComments(
                                comments.map((cm) =>
                                  cm._id === c._id ? updated : cm
                                )
                              );
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
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="vp-recommend">
              {recommended.map((v) => (
                <div
                  key={v._id}
                  className="vp-rec-item"
                  onClick={() => navigate(`/video/${v._id}`)}
                >
                  <div className="vp-rec-thumb">
                    {v.thumbnailUrl && <img src={v.thumbnailUrl} alt={v.title} />}
                  </div>

                  <div className="vp-rec-meta">
                    <div className="vp-rec-title">{v.title}</div>
                    <div className="vp-rec-channel">
                      {v.uploader?.username}
                    </div>
                  </div>
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