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
      if (comment.id === commentId) {
        // If this is the comment to be deleted, check if the author is the same as the current user
        if (comment.user.id === currentUser.id) {
          return false;
        } else {
          // If the author is not the same as the current user, delete the comment and its children
          return false;
        }
      } else {
        // If this is not the comment to be deleted, recursively delete its children
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
          children: comment.children.filter((childComment) => {
            if (childComment.id === commentId) {
              // If this is the reply to be deleted, check if the author is the same as the current user or if the parent comment is authored by the current user
              if (
                childComment.user.id === currentUser.id ||
                comment.user.id === currentUser.id
              ) {
                return false;
              } else {
                return true;
              }
            } else {
              // If this is not the reply to be deleted, keep the comment
              return true;
            }
          }),
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
