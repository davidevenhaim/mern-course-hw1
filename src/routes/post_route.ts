import express from "express";
const router = express.Router();
import post from "../controllers/post";

router.get("/", post.getAllPosts);

router.get("/:id", post.getPostById);

router.post("/", post.addNewPost);

router.put("/:id", post.updatePostById);

export default router;
