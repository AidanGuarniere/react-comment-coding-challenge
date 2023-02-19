import React from "react";
import Comment from "./Comment";
import AddCommentForm from "./AddCommentForm";

function CommentThread({
  comments,
  onAdd,
  onReply,
  onEdit,
  onDelete,
  currentUser,
}) {
  const submitComment = (text) => {
    onAdd(text);
  };

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
          currentUser={currentUser}
        />
      ))}
      <AddCommentForm onSubmit={submitComment} />
    </div>
  );
}

export default CommentThread;
