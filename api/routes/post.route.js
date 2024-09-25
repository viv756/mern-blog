import express from "express";
import { verifyToken } from "../utils/verifyingUser.js";
import { create, getPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get('/getpost',getPost)

export default router;
