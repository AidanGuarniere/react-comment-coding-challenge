import React from "react";

function Comment({ comment }) {
  return (
    <div className="commentContainer">
      <div className="commentBody">
        <h1>{comment.user.name}</h1>
        <p>{comment.text}</p>
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
