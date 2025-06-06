import { Request, Response, NextFunction } from "express";
import * as postService from "../services/postService";
import { CreatePostDto, UpdatePostDto } from "../types/PostDto";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/errors/ApiError";

export const getPosts = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { sortBy } = req.query;
    const posts = postService.getPosts(sortBy as string | undefined);
    res.status(200).json(ApiResponse.ok(posts));
  } catch (error) {
    next(error);
  }
};

export const getPostById = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): void => {
  try {
    const id = parseInt(req.params.id, 10);
    const post = postService.getPostById(id);
    res.status(200).json(ApiResponse.ok(post));
  } catch (error) {
    next(error);
  }
};

export const createPost = (
  req: Request<{}, {}, CreatePostDto>,
  res: Response,
  next: NextFunction
): void => {
  try {
    const newPost = postService.createPost(req.body);
    res.status(201).json(ApiResponse.created(newPost));
  } catch (error) {
    next(error);
  }
};

export const updatePost = (
  req: Request<{ id: string }, {}, UpdatePostDto>,
  res: Response,
  next: NextFunction
): void => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedPost = postService.updatePost(id, req.body);
    res.status(200).json(ApiResponse.ok(updatedPost));
  } catch (error) {
    next(error);
  }
};

export const deletePostById = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): void => {
  try {
    const id = parseInt(req.params.id, 10);
    postService.deletePostById(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

