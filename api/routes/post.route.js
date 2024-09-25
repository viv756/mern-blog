import express from "express";
import { verifyToken } from "../utils/verifyingUser.js";
import { create, deletePost, getPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPost);
router.delete("/deletepost/:postId/:userId", verifyToken, deletePost);

export default router;
