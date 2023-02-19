
import React, {useEffect} from "react";
import "./App.css";
import Comment from "./components/Comment";
import CommentThread from "./components/CommentThread";
import { comments } from "./data/comments.js";

function App() {

  useEffect(() => {
    console.log(comments);
  }, [])
  
  return (
    <div className="App">
      <CommentThread comments={comments} />
    </div>
  );
}

export default App;
