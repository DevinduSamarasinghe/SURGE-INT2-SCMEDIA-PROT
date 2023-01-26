import express from 'express';
import { createPost, getAllPosts ,likePost} from '../controllers/posts.controller.js';
const router = express.Router();

//These are routers passed down
router.get("/",getAllPosts);
router.post("/createPost",createPost);
router.patch("/likePost/:id",likePost);
export default router;