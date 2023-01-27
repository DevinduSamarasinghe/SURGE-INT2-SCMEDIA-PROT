import express from 'express';
import { createPost, getAllPosts ,likePost} from '../controllers/posts.controller.js';
import { registerUser, authUser,getUser, deleteUser, getAllUsers} from '../controllers/user.controller.js';
import auth from "../middleware/auth.js";
const router = express.Router();

//These are routers passed down

//user Routes
router.post("/register",registerUser);
router.post("/",authUser);
router.get("/profile",auth,getUser);
router.delete("/delete/:id",deleteUser);
router.get("/viewAll",getAllUsers);
//Posts Routes
router.get("/feed",getAllPosts);
router.post("/createPost",createPost);
router.patch("/likePost/:id",likePost);
export default router;