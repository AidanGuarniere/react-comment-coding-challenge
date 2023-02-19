type CommentDataStructure = {
    id: Number
    text: String
    user: {
        id: Number,
        name: String
    }
    children: Comment[]
}