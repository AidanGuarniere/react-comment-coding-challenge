import React from "react";
import Comment from "./Comment";
import AddCommentForm from "./AddCommentForm";

function CommentThread({ comments, onAdd, onReply }) {
  const submitComment = (text) => {
    onAdd(text);
  };

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onReply={onReply} />
      ))}
      <AddCommentForm onSubmit={submitComment} />
    </div>
  );
}

export default CommentThread;
