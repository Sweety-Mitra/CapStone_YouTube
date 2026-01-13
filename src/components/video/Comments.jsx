// This component handles video comments
// Users can add and delete comments (frontend-only for now)

import { useState } from "react";

const Comments = () => {
  // State to store list of comments
  const [comments, setComments] = useState([]);

  // State for input field
  const [commentText, setCommentText] = useState("");

  // Function to add a comment
  const addComment = () => {
    if (!commentText.trim()) return;

    setComments([...comments, commentText]);
    setCommentText("");
  };

  // Function to delete a comment
  const deleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>

      {/* Input field */}
      <input
        type="text"
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />

      {/* Add comment button */}
      <button onClick={addComment}>Post</button>

      {/* Comments list */}
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            {comment}
            <button onClick={() => deleteComment(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
