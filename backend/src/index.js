
import groupRoutes from "./routes/group.routes.js";




 /* 
 // Add this early in your main application file (app.js/server.js)
import EventEmitter from 'events';
EventEmitter.defaultMaxListeners = 15; // Increase from default 10 */
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import { app, server } from "./lib/socket.js";
dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    Credentials: true,}
))
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

app.use("/api/groups", groupRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
    }

    


server.listen(5001,()=>{
    console.log("server is running on port PORT:"+ PORT);
    connectDB();
    
})
 



