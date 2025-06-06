import request from "supertest";
import app from "../../index";
import { posts } from "../../data/posts";
import { Post } from "../../types/Post";

describe("Integration Tests", () => {
  const initialPosts: Post[] = [
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
    posts.length = 0;
    posts.push(...JSON.parse(JSON.stringify(initialPosts)));
  });

  describe("GET /health", () => {
    it("should return 200 OK", async () => {
      const response = await request(app).get("/health");
      expect(response.status).toBe(200);
    });
  });

  describe("GET /careers/", () => {
    it("should return posts sorted by id ascending by default", async () => {
      const response = await request(app).get("/careers/");
      expect(response.status).toBe(200);
      const returnedPosts: Post[] = response.body.data;
      expect(returnedPosts[0].id).toBe(1);
      expect(returnedPosts[1].id).toBe(2);
      expect(returnedPosts[2].id).toBe(3);
    });

    it("should return posts sorted by created_datetime descending", async () => {
      const response = await request(app).get(
        "/careers/?sortBy=-created_datetime"
      );
      expect(response.status).toBe(200);
      const returnedPosts: Post[] = response.body.data;
      expect(returnedPosts[0].username).toBe("Carol"); // Newest
      expect(returnedPosts[1].username).toBe("Bob");
      expect(returnedPosts[2].username).toBe("Alice"); // Oldest
    });

    it("should return 400 for an invalid sort field", async () => {
      const response = await request(app).get("/careers/?sortBy=invalidField");
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Invalid sort field");
    });
  });

  describe("GET /careers/:id", () => {
    it("should return 200 OK", async () => {
      const newPost = {
        username: "Test User",
        title: "Test Title",
        content: "Test Content",
      };

      const createResponse = await request(app).post("/careers/").send(newPost);
      const createdPost = createResponse.body.data;
      const response = await request(app).get(`/careers/${createdPost.id}`);
      expect(response.status).toBe(200);
    });

    it("should return 404 if post not found", async () => {
      const response = await request(app).get("/careers/9999");
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("not found");
    });
  });

  describe("POST /careers/", () => {
    it("should create a new post and return 201", async () => {
      const initialPostCount = posts.length;
      const newPost = {
        username: "Test User",
        title: "Test Title",
        content: "Test Content",
      };

      const response = await request(app).post("/careers/").send(newPost);

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.username).toBe(newPost.username);
      expect(response.body.data.title).toBe(newPost.title);
      expect(response.body.data.content).toBe(newPost.content);

      expect(posts.length).toBe(initialPostCount + 1);
    });

    it("should return 400 if required fields are missing", async () => {
      const newPost = {
        username: "Test User",
        content: "Test Content",
      };

      const response = await request(app).post("/careers/").send(newPost);
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Missing required fields");
    });
  });

  describe("DELETE /careers/:id", () => {
    it("should delete a post and return 204", async () => {
      const newPost = {
        username: "UserToDelete",
        title: "ToDelete",
        content: "ToDelete",
      };

      const createResponse = await request(app).post("/careers/").send(newPost);
      const createdPost = createResponse.body.data;
      const initialPostCount = posts.length;

      const deleteResponse = await request(app).delete(
        `/careers/${createdPost.id}`
      );
      expect(deleteResponse.status).toBe(204);

      expect(posts.length).toBe(initialPostCount - 1);
      const foundPost = posts.find((p) => p.id === createdPost.id);
      expect(foundPost).toBeUndefined();
    });

    it("should return 404 if post to delete is not found", async () => {
      const response = await request(app).delete("/careers/9999");
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
