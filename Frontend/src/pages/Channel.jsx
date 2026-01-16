// Channel Page
// - Create channel (only once per user)
// - View channel details
// - List videos uploaded by this channel (next step will expand this)

import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { createChannel, fetchMyChannel } from "../api/channel";
import { fetchChannelVideos, updateVideo, deleteVideo } from "../api/videos";


const Channel = () => {

  const [videos, setVideos] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // Channel state
  const [channel, setChannel] = useState(null);

  // Form state
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  // Load user's channel (if exists)
  useEffect(() => {
    const loadChannel = async () => {
      try {
        const data = await fetchMyChannel();
        setChannel(data);
      } catch (err) {
        console.error("No channel found");
      }
    };

    loadChannel();
  }, []);

  useEffect(() => {
  if (channel?._id) {
    fetchChannelVideos(channel._id).then(setVideos);
  }
}, [channel]);

  // Create channel
  const handleCreateChannel = async () => {
    if (!channelName.trim()) return;

    try {
      const newChannel = await createChannel({
        channelName,
        description,
      });
      setChannel(newChannel);
    } catch (err) {
      alert("Failed to create channel");
    }
  };

  // If user is not logged in
  if (!user) {
    return (
      <MainLayout>
        <p>Please login to access your channel.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* ========================= */}
      {/* CREATE CHANNEL SECTION */}
      {/* ========================= */}
      {!channel ? (
        <div>
          <h2>Create Your Channel</h2>

          <input
            type="text"
            placeholder="Channel name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />

          <br />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <br />

          <button onClick={handleCreateChannel}>
            Create Channel
          </button>
        </div>
      ) : (
        /* ========================= */
        /* CHANNEL DETAILS SECTION */
        /* ========================= */
        <div>
          <h2>{channel.channelName}</h2>
          <p>{channel.description}</p>
          <p>
            <strong>Subscribers:</strong>{" "}
            {channel.subscribers}
          </p>

          {/* Placeholder for channel videos */}
          <hr />
          <h3>Your Videos</h3>
          {videos.map((v) => (
            <div key={v._id}>
              <strong>{v.title}</strong>

              <button
                onClick={async () => {
                  const newTitle = prompt("New title", v.title);
                  if (!newTitle) return;
                  const updated = await updateVideo(v._id, { title: newTitle });
                  setVideos(videos.map((vid) => (vid._id === v._id ? updated : vid)));
                }}
              >
                Edit
              </button>

              <button
                onClick={async () => {
                  await deleteVideo(v._id);
                  setVideos(videos.filter((vid) => vid._id !== v._id));
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default Channel;
