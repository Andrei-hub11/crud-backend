"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const posts_1 = require("../../data/posts");
describe("Integration Tests", () => {
    const initialPosts = [
        {
            id: 1,
            username: "Carol",
            created_datetime: "2023-01-03T00:00:00.000Z",
            title: "Post A",
            content: "Content A",
        },
        {
            id: 2,
            username: "Alice",
            created_datetime: "2023-01-01T00:00:00.000Z",
            title: "Post B",
            content: "Content B",
        },
        {
            id: 3,
            username: "Bob",
            created_datetime: "2023-01-02T00:00:00.000Z",
            title: "Post C",
            content: "Content C",
        },
    ];
    beforeEach(() => {
        // Reset and seed the in-memory database before each test
        posts_1.posts.length = 0;
        posts_1.posts.push(...JSON.parse(JSON.stringify(initialPosts)));
    });
    describe("GET /health", () => {
        it("should return 200 OK", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).get("/health");
            expect(response.status).toBe(200);
        }));
    });
    describe("GET /careers/", () => {
        it("should return posts sorted by id ascending by default", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).get("/careers/");
            expect(response.status).toBe(200);
            const returnedPosts = response.body.data;
            expect(returnedPosts[0].id).toBe(1);
            expect(returnedPosts[1].id).toBe(2);
            expect(returnedPosts[2].id).toBe(3);
        }));
        it("should return posts sorted by created_datetime descending", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).get("/careers/?sortBy=-created_datetime");
            expect(response.status).toBe(200);
            const returnedPosts = response.body.data;
            expect(returnedPosts[0].username).toBe("Carol"); // Newest
            expect(returnedPosts[1].username).toBe("Bob");
            expect(returnedPosts[2].username).toBe("Alice"); // Oldest
        }));
        it("should return 400 for an invalid sort field", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).get("/careers/?sortBy=invalidField");
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain("Invalid sort field");
        }));
    });
    describe("GET /careers/:id", () => {
        it("should return 200 OK", () => __awaiter(void 0, void 0, void 0, function* () {
            const newPost = {
                username: "Test User",
                title: "Test Title",
                content: "Test Content",
            };
            const createResponse = yield (0, supertest_1.default)(index_1.default).post("/careers/").send(newPost);
            const createdPost = createResponse.body.data;
            const response = yield (0, supertest_1.default)(index_1.default).get(`/careers/${createdPost.id}`);
            expect(response.status).toBe(200);
        }));
        it("should return 404 if post not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).get("/careers/9999");
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain("not found");
        }));
    });
    describe("POST /careers/", () => {
        it("should create a new post and return 201", () => __awaiter(void 0, void 0, void 0, function* () {
            const initialPostCount = posts_1.posts.length;
            const newPost = {
                username: "Test User",
                title: "Test Title",
                content: "Test Content",
            };
            const response = yield (0, supertest_1.default)(index_1.default).post("/careers/").send(newPost);
            expect(response.status).toBe(201);
            expect(response.body.data).toHaveProperty("id");
            expect(response.body.data.username).toBe(newPost.username);
            expect(response.body.data.title).toBe(newPost.title);
            expect(response.body.data.content).toBe(newPost.content);
            expect(posts_1.posts.length).toBe(initialPostCount + 1);
        }));
        it("should return 400 if required fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
            const newPost = {
                username: "Test User",
                content: "Test Content",
            };
            const response = yield (0, supertest_1.default)(index_1.default).post("/careers/").send(newPost);
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain("Missing required fields");
        }));
    });
    describe("DELETE /careers/:id", () => {
        it("should delete a post and return 204", () => __awaiter(void 0, void 0, void 0, function* () {
            const newPost = {
                username: "UserToDelete",
                title: "ToDelete",
                content: "ToDelete",
            };
            const createResponse = yield (0, supertest_1.default)(index_1.default).post("/careers/").send(newPost);
            const createdPost = createResponse.body.data;
            const initialPostCount = posts_1.posts.length;
            const deleteResponse = yield (0, supertest_1.default)(index_1.default).delete(`/careers/${createdPost.id}`);
            expect(deleteResponse.status).toBe(204);
            expect(posts_1.posts.length).toBe(initialPostCount - 1);
            const foundPost = posts_1.posts.find((p) => p.id === createdPost.id);
            expect(foundPost).toBeUndefined();
        }));
        it("should return 404 if post to delete is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).delete("/careers/9999");
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        }));
    });
});
