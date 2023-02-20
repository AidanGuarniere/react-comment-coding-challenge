export function editComment(comments, commentId, text, currentUser) {
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