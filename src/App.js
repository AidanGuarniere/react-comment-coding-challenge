import React, { useState, useEffect } from "react";
import "./App.css";
import Comment from "./components/Comment";
import CommentThread from "./components/CommentThread";
import { starterComments } from "./data/comments.js";

function App() {
  const users = [
    { id: 1, name: "Joe" },
    { id: 2, name: "Shmoe" },
    { id: 3, name: "Broe" },
  ];
  const [comments, setComments] = useState(starterComments);

  const [currentUser, setCurrentUser] = useState(users[1]);

  const addComment = (comments, text, currentUser) => {
    const newComment = {
      id: Date.now(),
      text: text,
      user: currentUser,
      children: [],
    };
    return [...comments, newComment];
  };

  const handleAddComment = (text) => {
    const newComments = addComment(comments, text, currentUser);
    setComments(newComments);
  };

  function addReply(comments, parentId, text, currentUser) {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        const newComment = {
          id: Date.now(),
          text: text,
          user: currentUser,
          children: [],
        };
        return {
          ...comment,
          children: [...comment.children, newComment],
        };
      } else {
        return {
          ...comment,
          children: addReply(comment.children, parentId, text, currentUser),
        };
      }
    });
  }

  const handleAddReply = (parentId, text) => {
    const newComments = addReply(comments, parentId, text, currentUser);
    setComments(newComments);
  };

  function editComment(comments, commentId, text, currentUser) {
    return comments.map((comment) => {
      if (comment.id === commentId) {
        if (currentUser.id === comment.user.id) {
          return {
            ...comment,
            text: text,
          };
        } else {
          return comment;
        }
      } else {
        return {
          ...comment,
          children: editComment(comment.children, commentId, text, currentUser),
        };
      }
    });
  }

  const handleEditComment = (commentId, text) => {
    const newComments = editComment(comments, commentId, text, currentUser);
    setComments(newComments);
  };

  function deleteComment(comments, commentId) {
    return comments.filter((comment) => {
      if (comment.id === commentId) {
        return false;
      } else {
        comment.children = deleteComment(comment.children, commentId);
        return true;
      }
    });
  }

  const handleDeleteComment = (commentId) => {
    const newComments = deleteComment(comments, commentId);
    setComments(newComments);
  };

  return (
    <div className="App">
      <p>Current User: {currentUser.name}</p>
      <CommentThread
        comments={comments}
        onAdd={handleAddComment}
        onReply={handleAddReply}
        onEdit={handleEditComment}
        onDelete={handleDeleteComment}
        currentUser={currentUser}
      />
    </div>
  );
}

export default App;
