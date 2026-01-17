import { useEffect, useState } from "react";
import { uploadVideo, updateVideo } from "../../api/videos";
import "./UploadVideo.css";

const UploadVideo = ({ channelId, onSuccess, editVideo, onClose }) => {
  const isEdit = Boolean(editVideo);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("coding");

  /* PREFILL WHEN EDITING */
  useEffect(() => {
    if (editVideo) {
      setTitle(editVideo.title);
      setDescription(editVideo.description || "");
      setVideoUrl(editVideo.videoUrl);
      setThumbnailUrl(editVideo.thumbnailUrl);
      setCategory(editVideo.category || "coding");
    }
  }, [editVideo]);

  const handleSubmit = async () => {
    if (!title || !videoUrl || !thumbnailUrl) {
      alert("Required fields missing");
      return;
    }

    try {
      setLoading(true);

      let result;

      if (isEdit) {
        result = await updateVideo(editVideo._id, {
          title,
          description,
          thumbnailUrl,
          category,
        });
      } else {
        result = await uploadVideo({
          title,
          description,
          videoUrl,
          thumbnailUrl,
          category,
          channelId,
        });
      }

      onSuccess(result);
      onClose();
    } catch {
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-modal">
      <div className="upload-video">
        <h3>{isEdit ? "Edit Video" : "Upload Video"}</h3>

        <input
          placeholder="Video title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {!isEdit && (
          <input
            placeholder="Video URL *"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        )}

        <input
          placeholder="Thumbnail URL *"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />

        {/* CATEGORY FIELD */}
        <div className="upload-field">
          <label className="upload-label">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="coding">Coding</option>
            <option value="gaming">Gaming</option>
            <option value="music">Travel</option>
            <option value="education">Education</option>
            <option value="vlogs">Vlogs</option>
            <option value="music">Music</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>
        </div>

        <div className="upload-actions">
          <button onClick={onClose} className="secondary">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Save Changes" : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
