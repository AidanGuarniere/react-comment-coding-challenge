import React from "react";
import Comment from "./Comment";
import AddCommentForm from "./AddCommentForm";

function CommentThread({ comments, onAdd, onReply, onEdit, onDelete }) {
  const submitComment = (text) => {
    onAdd(text);
  };

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onReply={onReply} onEdit={onEdit} onDelete={onDelete} />
      ))}
      <AddCommentForm onSubmit={submitComment} />
    </div>
  );
}

export default CommentThread;
