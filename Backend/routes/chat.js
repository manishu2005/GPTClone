import express from "express";
import Thread from "../models/threadSchema.js";
import getGptResponse from "../utils/gptResponse.js";
const router = express.Router();

router.post("/test", async(req,res)=>{
    try {
       const thread = new Thread({
        threadId:'xyz123',
        title:"Testing new thread"
       });
       const respnse = await thread.save();
       res.send(respnse);
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Something went wrong"});
    }
})

router.get("/thread",async(req,res)=>{
    try {
        const threads = await Thread.find({}).sort({updatedAt:-1});
        res.json(threads);
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"failed to fetch thread"});
    }
})

router.get("/thread/:threadId",async(req,res)=>{
    const {threadId} = req.params;
    try {
        const thread = await Thread.findOne({threadId});
        if(thread){
            res.json(thread.messages);
        }else{
            res.status(404).json({error:"Thread not found"});
        }
    } catch (error) {
          console.log(error)
        res.status(500).json({error:"failed to fetch threadId"});
    }
})

router.delete("/thread/:threadId",async(req,res)=>{
    const {threadId} = req.params;
    try {
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if(deletedThread){
            res.json({message:"Thread deleted successfully"});
        }else{
            res.status(404).json({error:"Thread not found"});
        }
    } catch (error) {
         console.log(error)
        res.status(500).json({error:"failed to delete threadId"});
    }
})

router.post("/chat",async(req,res)=>{
    const {threadId,message}=req.body;
    if(!threadId || !message){
       return res.status(400).json({error:"missing required fields"});
    }
    try {
        let thread = await Thread.findOne({threadId});
        if(!thread){
            thread = new Thread({
                threadId,
                title:message,
                messages:[{role:"user", content:message}]
            });
        }else{
            thread.messages.push({role:"user", content:message});
            
        }
       const assistantReply = await getGptResponse(message);
       thread.messages.push({role:"assistant", content:assistantReply});
       thread.updatedAt = Date.now();

       await thread.save();
         res.json({reply:assistantReply});
    } catch (error) {
         console.log(error)
        res.status(500).json({error:"failed to create chat message"});
    }
})
export default router;