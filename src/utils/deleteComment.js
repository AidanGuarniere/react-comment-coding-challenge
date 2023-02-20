function isChildOfComment(parentCommentId, comment, currentUser) {
  if (comment.id === parentCommentId) {
    // If this is the parent comment, check if the author is the same as the current user
    if (comment.user.id === currentUser.id) {
      return true;
    } else {
      return false;
    }
  } else {
    // If this is a reply to the parent comment, recursively check its children
    for (let i = 0; i < comment.children.length; i++) {
      if (isChildOfComment(parentCommentId, comment.children[i], currentUser)) {
        return true;
      }
    }
    return false;
  }
}

export function deleteComment(
  comments,
  commentId,
  parentCommentId,
  currentUser
) {
  // Check if the comment to be deleted is a parent comment or a reply
  if (parentCommentId === null) {
    // If the parentCommentId is null, the comment to be deleted is a parent comment
    return comments.filter((comment) => {
      console.log(comment.id, commentId)
      if (comment.id === commentId) {
        return false;
      } else {
        return {
          ...comment,
          children: deleteComment(
            comment.children,
            commentId,
            parentCommentId,
            currentUser
          ),
        };
      }
    });
  } else {
    // If the parentCommentId is not null, the comment to be deleted is a reply to the parent comment
    return comments.map((comment) => {
      if (comment.id === parentCommentId) {
        // If this is the parent comment, filter out the reply to be deleted
        return {
          ...comment,
          children: comment.children.filter(
            (childComment) =>
              childComment.id !== commentId ||
              childComment.user.id === currentUser.id
          ),
        };
      } else {
        // If this is not the parent comment, recursively delete the reply from its children
        return {
          ...comment,
          children: deleteComment(
            comment.children,
            commentId,
            parentCommentId,
            currentUser
          ),
        };
      }
    });
  }
}
