export function addReply(comments, parentId, text, currentUser) {
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
