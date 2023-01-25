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

