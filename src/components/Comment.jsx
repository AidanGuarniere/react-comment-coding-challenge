import React, { useState } from "react";
import AddCommentForm from "./AddCommentForm";

function Comment({ comment, onReply }) {
  const [replying, setReplying] = useState(false);

  const handleReply = (text) => {
    onReply(comment.id, text);
  };
  return (
    <div className="commentContainer">
      <div className="commentBody">
        <h1>{comment.user.name}</h1>
        <p>{comment.text}</p>
        <button onClick={() => setReplying(true)}>Reply</button>
        {replying && (
          <AddCommentForm
            onSubmit={handleReply}
            onCancel={() => setReplying(false)}
          />
        )}
      </div>
      <div className="commentReplies">
        {" "}
        {comment.children.map((child) => (
          <Comment key={child.id} comment={child} />
        ))}
      </div>
    </div>
  );
}

export default Comment;
