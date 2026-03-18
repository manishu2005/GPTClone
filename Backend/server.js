import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api",chatRoutes);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('connect to db')
  } catch (error) {
    console.log("db error", error);
  }
}


app.listen(5000, () => {
  console.log("Server running on port 5000");
  connectDB();
});