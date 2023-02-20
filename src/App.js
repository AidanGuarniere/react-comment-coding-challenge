import React, { useState } from "react";
import "./App.css";
import CommentThread from "./components/CommentThread";
import { starterComments } from "./data/comments.js";
import { addComment } from "./utils/addComment";
import { editComment } from "./utils/editComment";
import { addReply } from "./utils/addReply";
import { deleteComment } from "./utils/deleteComment";


function App() {
  const users = [
    { id: 1, name: "Joe" },
    { id: 2, name: "Shmoe" },
    { id: 3, name: "Broe" },
  ];
  const [comments, setComments] = useState(starterComments);

  const [currentUser, setCurrentUser] = useState(users[0]);

  const handleAddComment = (text) => {
    const newComments = addComment(comments, text, currentUser);
    setComments(newComments);
  };


  const handleAddReply = (parentId, text) => {
    const newComments = addReply(comments, parentId, text, currentUser);
    setComments(newComments);
  };

  const handleEditComment = (commentId, text) => {
    const newComments = editComment(comments, commentId, text, currentUser);
    setComments(newComments);
  };

  const handleDeleteComment = (commentId, parentId) => {
    const newComments = deleteComment(
      comments,
      commentId,
      parentId,
      currentUser
    );
    setComments(newComments);
  };

  return (
    <div className="App">
      <p>Current User: {currentUser.name}</p>
      <select
        value={currentUser.id}
        onChange={(event) =>
          setCurrentUser(
            users.find((user) => user.id === parseInt(event.target.value))
          )
        }
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
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
