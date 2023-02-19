const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const comments = [
  {
    id: 1,
    text: "First comment",
    user: users[0],
    children: [
      {
        id: 2,
        text: "Reply to first comment",
        user: users[1],
        children: [],
      },
      {
        id: 3,
        text: "Another reply to first comment",
        user: users[2],
        children: [],
      },
    ],
  },
  {
    id: 4,
    text: "Second comment",
    user: users[1],
    children: [],
  },
];

export { comments };
