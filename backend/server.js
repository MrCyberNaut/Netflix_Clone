// const express = require('express); // commonJS
import express from "express";  // ems emmascript
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use("/api/v1/auth",authRoutes)

app.listen (5000,()=>{
    console.log('Server started at http://localhost:5000');
});