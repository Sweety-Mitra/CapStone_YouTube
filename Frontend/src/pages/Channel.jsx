import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { createChannel, fetchMyChannel } from "../api/channel";
import { fetchChannelVideos, updateVideo, deleteVideo } from "../api/videos";
import UploadVideo from "../components/upload/UploadVideo";
import "./Channel.css";
import { useSearchParams } from "react-router-dom";

const Channel = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  /* CREATE CHANNEL FORM STATE */
  const [channelName, setChannelName] = useState("");
  const [handle, setHandle] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [showForm, setShowForm] = useState(false);
  const [editVideo, setEditVideo] = useState(null);

  /* LOAD CHANNEL */
  useEffect(() => {
    const loadChannel = async () => {
      try {
        const data = await fetchMyChannel();
        setChannel(data);
      } catch {
        setChannel(null);
      } finally {
        setLoading(false);
      }
    };
    loadChannel();
  }, []);

  /* LOAD CHANNEL VIDEOS */
  useEffect(() => {
    if (channel?._id) {
      fetchChannelVideos(channel._id).then(setVideos);
    }
  }, [channel]);

  useEffect(() => {
  if (searchParams.get("upload") === "true" && channel) {
    setEditVideo(null);
    setShowForm(true);

    // clean URL after opening
    setSearchParams({});
  }
  }, [searchParams, channel, setSearchParams]);

  /* CREATE CHANNEL */
  const handleCreateChannel = async () => {
    if (!channelName.trim() || !handle.trim()) {
      alert("Channel name and handle are required");
      return;
    }

    try {
      const newChannel = await createChannel({
        channelName,
        handle,
        description,
        avatar,
        banner,
      });
      setChannel(newChannel);
    } catch {
      alert("Failed to create channel");
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <p>Please login to access your channel.</p>
      </MainLayout>
    );
  }

  if (loading) {
    return (
      <MainLayout>
        <p>Loading channel...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="channel-page">

        {/* ============ CREATE CHANNEL ============ */}
        {!channel ? (
          <div className="channel-create">
            <h2>Create Channel</h2>

            <input
              placeholder="Channel name *"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />

            <input
              placeholder="Handle (unique) *"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />

            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              placeholder="Avatar image URL (optional)"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />

            <input
              placeholder="Banner image URL (optional)"
              value={banner}
              onChange={(e) => setBanner(e.target.value)}
            />

            <button onClick={handleCreateChannel}>
              Create Channel
            </button>
          </div>
        ) : (
          <>
            {/* ============ CHANNEL BANNER ============ */}
            <div className="channel-banner">
              <img
                src={
                  channel.banner ||
                  "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
                }
                className="channel-banner-img"
                alt="Channel banner"
              />
            </div>

            {/* ============ CHANNEL HEADER ============ */}
            <div className="channel-header">
              <img
                className="channel-avatar"
                src={channel.avatar || "https://i.pravatar.cc/150"}
                alt="Avatar"
              />

              <div className="channel-info">
                <h2 className="name">{channel.channelName}</h2>
                <p className="channel-handle namehandle">@{channel.handle}</p>
                <p className="channel-meta">
                  {channel.subscribers} subscribers • {videos.length} videos
                </p>
                <p className="channel-desc">{channel.description}</p>
              </div>

              <button className="subscribe-btn">Subscribe</button>
            </div>

            {/* <UploadVideo
              channelId={channel._id}
              onUpload={(newVideo) => setVideos((prev) => [newVideo, ...prev])}
            /> */}

            <button
              className="subscribe-btn"
              onClick={() => {
                setEditVideo(null);
                setShowForm(true);
              }}
            >
              Upload Video
            </button>

            {/* UPLOAD / EDIT MODAL */}
            {showForm && (
              <UploadVideo
                channelId={channel._id}
                editVideo={editVideo}
                onSuccess={(video) => {
                  setVideos((prev) =>
                    editVideo
                      ? prev.map((v) => (v._id === video._id ? video : v))
                      : [video, ...prev]
                  );
                }}
                onClose={() => {
                  setShowForm(false);
                  setEditVideo(null);
                }}
              />
            )}

            {/* ============ VIDEOS GRID ============ */}
            <h3 className="channel-videos-title">Your Videos</h3>

            <div className="video-grid">
              {videos.map((v) => (
                <div key={v._id} className="video-card-wrapper">
                  <Link to={`/video/${v._id}`} className="video-card-link">
                    <div className="video-card">
                      <img
                        src={v.thumbnailUrl}
                        alt={v.title}
                        className="video-thumb"
                      />
                      <h4 className="video-title">{v.title}</h4>
                      <p className="video-uploader">
                        {v.uploader?.username}
                      </p>
                      <span className="video-views">
                        {v.views} views
                      </span>
                    </div>
                  </Link>

                  <div className="video-actions">
                    <button
                      onClick={() => {
                        setEditVideo(v);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="danger"
                      onClick={async () => {
                        await deleteVideo(v._id);
                        setVideos(
                          videos.filter((vid) => vid._id !== v._id)
                        );
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};




export default Channel;
