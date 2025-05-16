
 import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
dotenv.config();
const app=express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes

)

app.listen(5001,()=>{
    console.log("server is running on port PORT:"+ PORT);
    connectDB();
    
})
 



