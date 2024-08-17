// const express = require('express); // commonJS
import express from "express";  // ems emmascript

import authRoutes from "./routes/auth.route.js";
import { ENV_VARS } from "./CONFIG/envVars.js";
import { connectDB } from "./CONFIG/db.js";



//console.log("MONGO URI :", process.env.MONGO_URI );
const app = express();

const PORT  = ENV_VARS.PORT;

app.use(express.json()); //will allow us to parser req.body

app.use("/api/v1/auth",authRoutes); // the other ones like the signup logi nand logout croutesw will be under the auth path

app.listen (PORT,()=>{
    console.log("Server started at http://localhost:"+ PORT );
    connectDB();
});