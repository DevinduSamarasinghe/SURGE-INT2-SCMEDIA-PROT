import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv/config"; //this is required to import the .env file 

import postRouter from "./routes/posts.routes.js"; // Importing routes file for navigation
const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

//assigning routes
app.use('/feed',postRouter);

//mongoDB
const PORT = process.env.PORT || 8060;
const URL = process.env.MONGODBURL;

//Connecting to mongoDB

mongoose.set('strictQuery', false); //to hide the deprecated warning
mongoose.connect(URL);
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB connection is Successful!');
});

app.listen(PORT, ()=>{
    console.log(`Server is up and running on PORT: ${PORT}`);
})
   