import { Post } from "../types/Post";

export const posts: Post[] = [
  {
    id: 1,
    username: "John Doe",
    created_datetime: new Date().toISOString(),
    title: "First Post",
    content: "This is the first post.",
  },
  {
    id: 2,
    username: "Jane Doe",
    created_datetime: new Date().toISOString(),
    title: "Second Post",
    content: "This is the second post.",
  },
];
