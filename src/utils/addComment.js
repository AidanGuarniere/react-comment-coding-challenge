export const addComment = (comments, text, currentUser) => {
  const newComment = {
    id: Date.now(),
    text: text,
    user: currentUser,
    children: [],
  };
  return [...comments, newComment];
};
