import React, { useState } from "react";

function EditCommentForm({ comment, onSubmit, onCancel }) {
  const [text, setText] = useState(comment.text);
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(text);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditCommentForm;
