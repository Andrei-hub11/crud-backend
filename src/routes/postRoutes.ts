import { Router } from "express";
import * as postController from "../controllers/postController";

const router = Router();

router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePostById);

export default router;

