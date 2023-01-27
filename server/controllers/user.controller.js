import User from "../models/users.model.js";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
import axios from "axios";
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
        const jwtData = {_id: user._id, name: user.email, username: user.username }
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

    const jwtData = {_id: user._id, name: user.email,username: user.username}
    const token = jwt.sign(jwtData, process.env.JWTSECRET,{expiresIn: "2h"});

    res.status(201).json(token);
}

export const getUser = async(req,res)=>{
    const profile = await User.findById(req.user._id);
    res.send(profile);
}


export const deleteUser = async(req,res)=>{
    try{
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.status(200).json({
            status: "User details deleted"
        })
    }catch(error){
        res.status(404).json({message: error});
    }
}

export const getAllUsers = async(req,res)=>{
    try{
        const user = await User.find();
        res.status(200).json(user);
    }catch(error){
        res.status(404).json(({
            message: error
        }));
    }
}

export const captchaVerify = async(req,res,next)=>{
    if(!req.body.token){
        return res.status(400).json({error: message + "Recaptcha Token is missing"});
    }

    try{
        const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRETRECAPTCHA}&response=${req.body.token}`;
        const response = await axios.post(googleVerifyUrl);
        const {success} = response.data;
        if(success){
            return res.json({success: true});
        }else{
            return res.json({error: "Invalid Captcha"});
        }
    }catch(error){
        return res.json({error: message});
    }
}