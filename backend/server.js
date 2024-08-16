// const express = require('express); // commonJS
import express from "express";  // ems emmascript
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";


dotenv.config();
console.log("MONGO URI :", process.env.MONGO_URI )
const app = express();

app.use("/api/v1/auth",authRoutes); // the other ones like the signup logi nand logout croutesw will be under the auth path

app.listen (5000,()=>{
    console.log('Server started at http://localhost:5000');
});