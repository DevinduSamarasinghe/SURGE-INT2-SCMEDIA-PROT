import mongoose from "mongoose";

const Schema = mongoose.Schema;
const postSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    post: {
        type:String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    postedDate: {
        type: String,
        required: true
    },
    likes:{
        type: Number
    } 
    //comments: [String],
});

const Posts = mongoose.model("Posts",postSchema);
export default Posts;

