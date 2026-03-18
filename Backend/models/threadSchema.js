import mongoose from "mongoose";
import messageSchema from "./messageSchema.js";

const threadSchema = new mongoose.Schema({
    threadId:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        default:"New Thread"
    },
    messages:[messageSchema],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})
export default mongoose.model("Thread",threadSchema);