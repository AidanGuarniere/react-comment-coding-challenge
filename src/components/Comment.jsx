import React, { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import EditCommentForm from "./EditCommentForm";

function Comment({ comment, onReply, onEdit, onDelete, currentUser, showDelete }) {
  const [editing, setEditing] = useState(false);
  const [replying, setReplying] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSaveEdit = (text) => {
    onEdit(comment.id, text);
    setEditing(false);
  };

  const handleReply = (text) => {
    onReply(comment.id, text);
    setReplying(false);
  };

  return (
    <div className="commentContainer">
      <div className="commentBody">
        <h1>{comment.user.name}</h1>
        <p>{comment.text}</p>
        {currentUser && (
          <>
            {" "}
            <button onClick={() => setReplying(true)}>Reply</button>
            {replying && (
              <>
                <AddCommentForm
                  onSubmit={handleReply}
                  onCancel={() => setReplying(false)}
                />
                <button onClick={() => setReplying(false)}>Cancel</button>
              </>
            )}
            {comment.user.id === currentUser.id && (
              <button onClick={handleEdit}>Edit</button>
            )}
            {editing ? (
              <EditCommentForm
                comment={comment}
                onSubmit={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            ) : null}
            {comment.user.id === currentUser.id || showDelete === true ? (
              <button onClick={() => onDelete(comment.id)}>Delete</button>
            ) : null}
          </>
        )}
      </div>

      <div className="commentReplies">
        {" "}
        {comment.children.map((child) => (
          <Comment
            key={child.id}
            comment={child}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
            currentUser={currentUser}
            showDelete={comment.user.id === currentUser.id ? true : false}
          />
        ))}
      </div>
    </div>
  );
}

export default Comment;
