import { posts } from "../data/posts";
import { Post } from "../types/Post";
import { CreatePostDto, UpdatePostDto } from "../types/PostDto";
import { ApiError } from "../utils/errors/ApiError";

export const getPosts = (sortBy?: string): Post[] => {
  let sortField: keyof Post = "id";
  let sortDirection: "asc" | "desc" = "asc";

  if (sortBy) {
    if (sortBy.startsWith("-")) {
      sortDirection = "desc";
      sortField = sortBy.substring(1) as keyof Post;
    } else {
      sortField = sortBy as keyof Post;
    }

    const validFields: (keyof Post)[] = [
      "id",
      "username",
      "created_datetime",
      "title",
    ];
    if (!validFields.includes(sortField)) {
      throw new ApiError(`Invalid sort field: '${sortField}'`, 400);
    }
  }

  const sortedPosts = [...posts]; // Create a shallow copy to avoid modifying the original

  sortedPosts.sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];

    let comparison = 0;
    if (valA > valB) {
      comparison = 1;
    } else if (valA < valB) {
      comparison = -1;
    }

    return sortDirection === "desc" ? comparison * -1 : comparison;
  });

  return sortedPosts;
};

export const getPostById = (id: number): Post | undefined => {
  const post = posts.find((post) => post.id === id);

  if (!post) {
    throw new ApiError(`Post with id = '${id}' not found`, 404);
  }

  return post;
};

export const createPost = (postDto: CreatePostDto): Post => {
  if (!postDto.username || !postDto.title || !postDto.content) {
    throw new ApiError(
      "Missing required fields: username, title, content",
      400
    );
  }

  const newPost: Post = {
    id: posts.length + 1,
    username: postDto.username,
    created_datetime: new Date().toISOString(),
    title: postDto.title,
    content: postDto.content,
  };

  posts.push(newPost);
  return newPost;
};

export const updatePost = (id: number, postDto: UpdatePostDto): Post => {
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    throw new ApiError(`Post with id = '${id}' not found`, 404);
  }

  if (!postDto.title || !postDto.content) {
    throw new ApiError("Missing required fields: title, content", 400);
  }

  const updatedPost = {
    ...posts[postIndex],
    title: postDto.title,
    content: postDto.content,
  };

  posts[postIndex] = updatedPost;
  return updatedPost;
};

export const deletePostById = (id: number): void => {
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    throw new ApiError(`Post with id = '${id}' not found`, 404);
  }

  posts.splice(postIndex, 1);
};

