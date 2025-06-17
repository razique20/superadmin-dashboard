import React, { useState } from "react";

function CommentSection({ comments = [], onAdd, onEdit, onDelete, permissions = [] }) {
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const handleEditSave = () => {
    onEdit({ id: editingId, text: editText });
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">🗨️ Comments</h3>

      {comments.length === 0 && (
        <p className="text-gray-500 mb-4">No comments yet. Be the first to share something!</p>
      )}

      {comments.map((comment) => (
        <div key={comment.id} className="border border-gray-200 rounded p-4 mb-4 bg-gray-50">
          {editingId === comment.id ? (
            <div>
              <textarea
                className="w-full border rounded p-2 mb-2"
                rows="3"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEditSave}
                  className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start">
                <p className="text-gray-700">{comment.text}</p>
                <div className="flex gap-3">
                  {permissions.includes("Edit") && (
                    <button
                      onClick={() => handleEdit(comment)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                  {permissions.includes("Delete") && (
                    <button
                      onClick={() => onDelete(comment.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              {comment.history && (
                <div className="text-xs text-gray-400 mt-2">
                  Last edited by <strong>{comment.modifiedBy}</strong> on{" "}
                  <em>{comment.modifiedAt}</em>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {permissions.includes("Create") && (
        <div className="mt-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Write your comment..."
          ></textarea>
          <button
            onClick={() => {
              onAdd(text);
              setText("");
            }}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Post Comment
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentSection;
