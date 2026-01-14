// This component handles comments on the video
// Features supported:
// - Add comment
// - Delete comment
// - Edit comment (NEW FEATURE)

import { useState } from "react";

const Comments = () => {
  // Each comment is stored as an object
  const [comments, setComments] = useState([]);

  // Input text for new comment
  const [commentText, setCommentText] = useState("");

  // Track which comment is being edited
  const [editingIndex, setEditingIndex] = useState(null);

  // Text for editing comment
  const [editText, setEditText] = useState("");

  // ADD COMMENT
  const addComment = () => {
    if (!commentText.trim()) return;

    setComments([
      ...comments,
      { text: commentText }
    ]);

    setCommentText("");
  };

  // DELETE COMMENT
  const deleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  // START EDITING A COMMENT
  const startEdit = (index) => {
    setEditingIndex(index);
    setEditText(comments[index].text);
  };

  // SAVE EDITED COMMENT
  const saveEdit = (index) => {
    const updatedComments = comments.map((comment, i) =>
      i === index ? { text: editText } : comment
    );

    setComments(updatedComments);
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>

      {/* ADD COMMENT INPUT */}
      <input
        type="text"
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button onClick={addComment}>Post</button>

      {/* COMMENTS LIST */}
      <ul>
        {comments.map((comment, index) => (
          <li key={index} style={{ marginTop: "0.5rem" }}>
            {/* If this comment is being edited */}
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                {/* Normal comment view */}
                <span>{comment.text}</span>

                <button
                  onClick={() => startEdit(index)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteComment(index)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
