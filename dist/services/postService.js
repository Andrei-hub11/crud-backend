"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostById = exports.updatePost = exports.createPost = exports.getPostById = exports.getPosts = void 0;
const posts_1 = require("../data/posts");
const ApiError_1 = require("../utils/errors/ApiError");
const getPosts = (sortBy) => {
    let sortField = "id";
    let sortDirection = "asc";
    if (sortBy) {
        if (sortBy.startsWith("-")) {
            sortDirection = "desc";
            sortField = sortBy.substring(1);
        }
        else {
            sortField = sortBy;
        }
        const validFields = [
            "id",
            "username",
            "created_datetime",
            "title",
        ];
        if (!validFields.includes(sortField)) {
            throw new ApiError_1.ApiError(`Invalid sort field: '${sortField}'`, 400);
        }
    }
    const sortedPosts = [...posts_1.posts]; // Create a shallow copy to avoid modifying the original
    sortedPosts.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        let comparison = 0;
        if (valA > valB) {
            comparison = 1;
        }
        else if (valA < valB) {
            comparison = -1;
        }
        return sortDirection === "desc" ? comparison * -1 : comparison;
    });
    return sortedPosts;
};
exports.getPosts = getPosts;
const getPostById = (id) => {
    const post = posts_1.posts.find((post) => post.id === id);
    if (!post) {
        throw new ApiError_1.ApiError(`Post with id = '${id}' not found`, 404);
    }
    return post;
};
exports.getPostById = getPostById;
const createPost = (postDto) => {
    if (!postDto.username || !postDto.title || !postDto.content) {
        throw new ApiError_1.ApiError("Missing required fields: username, title, content", 400);
    }
    const newPost = {
        id: posts_1.posts.length + 1,
        username: postDto.username,
        created_datetime: new Date().toISOString(),
        title: postDto.title,
        content: postDto.content,
    };
    posts_1.posts.push(newPost);
    return newPost;
};
exports.createPost = createPost;
const updatePost = (id, postDto) => {
    const postIndex = posts_1.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
        throw new ApiError_1.ApiError(`Post with id = '${id}' not found`, 404);
    }
    if (!postDto.title || !postDto.content) {
        throw new ApiError_1.ApiError("Missing required fields: title, content", 400);
    }
    const updatedPost = Object.assign(Object.assign({}, posts_1.posts[postIndex]), { title: postDto.title, content: postDto.content });
    posts_1.posts[postIndex] = updatedPost;
    return updatedPost;
};
exports.updatePost = updatePost;
const deletePostById = (id) => {
    const postIndex = posts_1.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
        throw new ApiError_1.ApiError(`Post with id = '${id}' not found`, 404);
    }
    posts_1.posts.splice(postIndex, 1);
};
exports.deletePostById = deletePostById;
