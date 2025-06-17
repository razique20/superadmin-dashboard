import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import { useAuth } from '../contexts/AuthContext';

const mockComments = [
  { id: 1, text: 'Welcome comment!', modifiedBy: 'user1', modifiedAt: '2024-01-01 12:00' },
];

function PageViewer() {
  const { pageName } = useParams();
  const { user } = useAuth();
  const [comments, setComments] = useState(mockComments);

  const pageTitle = pageName.replace(/-/g, ' ');
  const permissions = user?.permissions?.[pageTitle] || [];

  const handleAdd = (text) => {
    const newComment = {
      id: comments.length + 1,
      text,
      modifiedBy: user.email,
      modifiedAt: new Date().toLocaleString(),
    };
    setComments([newComment, ...comments]);
  };

  const handleEdit = (comment) => {
    const newText = prompt('Edit comment:', comment.text);
    if (newText) {
      const updated = comments.map((c) =>
        c.id === comment.id ? { ...c, text: newText, modifiedBy: user.email, modifiedAt: new Date().toLocaleString() } : c
      );
      setComments(updated);
    }
  };

  const handleDelete = (id) => setComments(comments.filter((c) => c.id !== id));

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{pageTitle}</h2>
      <CommentSection
        comments={comments}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        permissions={permissions}
      />
    </div>
  );
}

export default PageViewer;
