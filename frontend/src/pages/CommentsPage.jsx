import React, { useState } from "react";
import CommentSection from "../components/CommentSection.jsx";

const dummyComments = [
  {
    id: 1,
    text: "Great work on the dashboard!",
    modifiedBy: "Admin",
    modifiedAt: "2025-06-15 10:34 AM",
    history: true,
  },
  {
    id: 2,
    text: "Can we add a dark mode?",
    modifiedBy: "User",
    modifiedAt: "2025-06-15 12:12 PM",
    history: true,
  },
];

function CommentsPage() {
  const [comments, setComments] = useState(dummyComments);

  const handleAdd = (text) => {
    const newComment = {
      id: Date.now(),
      text,
      modifiedBy: "Current User",
      modifiedAt: new Date().toLocaleString(),
      history: true,
    };
    setComments([newComment, ...comments]);
  };

  const handleEdit = ({ id, text }) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, text, modifiedAt: new Date().toLocaleString() } : comment
      )
    );
  };

  const handleDelete = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const permissions = ["Create", "Edit", "Delete"]; // dynamic per user role

  return <CommentSection comments={comments} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} permissions={permissions} />;
}

export default CommentsPage;
