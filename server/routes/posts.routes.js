import express from 'express';
import { createPost, getAllPosts } from '../controllers/posts.controller.js';
const router = express.Router();

//These are routers passed down
router.get("/",getAllPosts);
router.post("/createPost",createPost);

export default router;