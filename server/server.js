import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv/config"; //this is required to import the .env file 

const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

//mongoDB
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODBURL;

//Connecting to mongoDB

mongoose.set('strictQuery', false); //to hide the deprecated warning
mongoose.connect(URL);
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB connection is Successfull!');
});

app.listen(PORT, ()=>{
    console.log(`Server is up and running on PORT: ${PORT}`);
})
   