"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostById = exports.updatePost = exports.createPost = exports.getPostById = exports.getPosts = void 0;
const postService = __importStar(require("../services/postService"));
const ApiResponse_1 = require("../utils/ApiResponse");
const getPosts = (req, res, next) => {
    try {
        const { sortBy } = req.query;
        const posts = postService.getPosts(sortBy);
        res.status(200).json(ApiResponse_1.ApiResponse.ok(posts));
    }
    catch (error) {
        next(error);
    }
};
exports.getPosts = getPosts;
const getPostById = (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const post = postService.getPostById(id);
        res.status(200).json(ApiResponse_1.ApiResponse.ok(post));
    }
    catch (error) {
        next(error);
    }
};
exports.getPostById = getPostById;
const createPost = (req, res, next) => {
    try {
        const newPost = postService.createPost(req.body);
        res.status(201).json(ApiResponse_1.ApiResponse.created(newPost));
    }
    catch (error) {
        next(error);
    }
};
exports.createPost = createPost;
const updatePost = (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const updatedPost = postService.updatePost(id, req.body);
        res.status(200).json(ApiResponse_1.ApiResponse.ok(updatedPost));
    }
    catch (error) {
        next(error);
    }
};
exports.updatePost = updatePost;
const deletePostById = (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        postService.deletePostById(id);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deletePostById = deletePostById;
