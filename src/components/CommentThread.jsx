import React from "react";
import Comment from "./Comment";

function CommentThread({ comments }) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
    //add comment form
  );
}

export default CommentThread;
