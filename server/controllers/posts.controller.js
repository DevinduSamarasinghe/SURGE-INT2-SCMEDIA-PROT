import Posts from "../models/posts.model.js";
import mongoose from "mongoose";

export const getAllPosts = async(req,res)=>{
    try{
        const post = await Posts.find();
        res.status(200).json(post);
    }catch(error){
        res.status(404).json(({
            message: error
        }));
    }
}

export const createPost = async(req,res)=>{
    try{
        const post = req.body;
        const newPost = new Posts(post);
        await newPost.save();
        res.status(201).json(newPost);
    }catch(error){
        res.status(409).json({
            message: error
        });
    }
}

export const likePost = async(req,res)=>{

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that ID');

    const post = await Posts.findById(id);
    const updatedPost = await Posts.findByIdAndUpdate(id, {likes: post.likes + 1},{new:true})

    res.json(updatedPost);
}

