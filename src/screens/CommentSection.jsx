import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import { useParams } from "react-router-dom";

export const CommentSection = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState(""); // New state for the comment input

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/ama/${id}/comments`);
        console.log("Fetched Comments:", response.data); // Log the response to check the structure
        setComments(response.data); // Set the full comment data in the state
      } catch (err) {
        setError("Error fetching comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value); // Update the new comment state as the user types
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      return; // Do nothing if the comment is empty
    }

    try {
      const response = await axios.post(`/api/ama/${id}/comments`, {
        content: newComment,
        creatorId: localStorage.getItem("id")
      });
      setComments([response.data, ...comments]); // Add the new comment to the top of the list
      setNewComment(""); // Clear the input field
    } catch (err) {
      setError("Error posting comment");
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-white mb-4">Comments</h2>
      
      {comments.length === 0 ? (
        <p className="text-gray-400">No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="mb-4">
            <p className="text-white">{comment.content}</p>
            <p className="text-sm text-gray-500">
              by {comment.creatorId || "Unknown"} -{" "}
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}

      {/* Text area and submit button for posting a comment */}
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <textarea
          className="w-full p-2 bg-black text-white rounded-lg border mb-2"
          placeholder="Write your comment..."
          value={newComment}
          onChange={handleCommentChange}
          rows="4"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white/20 text-white rounded-lg "
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};
