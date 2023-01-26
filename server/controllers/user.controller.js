import User from "../models/users.model.js";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
const router = express.Router();

export const registerUser = async(req,res)=>{
    const {firstName, lastName, email,username,password } = req.body;

    //checking if the user already exists
    let user = await User.findOne({email});
    if(user) return res.status(400).send("User already Exists");

    //save data to database
    try{
        user = new User({firstName, lastName, email,username,password });
        await user.save();

        //generate JWT token 
        const jwtData = {_id: user._id, name: user.email}
        const token = jwt.sign(jwtData, process.env.JWTSECRET,{expiresIn: "2h"});

        res.status(201).json(token);
    }catch(error){
        res.status(409).json({
            message: error
        });
    }
}

export const authUser = async(req,res)=>{
    const {email, password} = req.body;
    let user = await User.findOne({email,password});
    if(!user) return res.status(400).send("Invalid username or password");

    const jwtData = {_id: user._id, name: user.email}
    const token = jwt.sign(jwtData, process.env.JWTSECRET,{expiresIn: "2h"});

    res.status(201).json(token);
}

export const getUser = async(req,res)=>{
    const profile = await User.findById(req.user._id);
    res.send(profile);
}