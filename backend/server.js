// const express = require('express); // commonJS
import express from "express";  // ems emmascript

import authRoutes from "./routes/auth.route.js"; // we are importing the routes from the auth.route.js file
import movieRoutes from "./routes/movie.route.js"; // we are importing the routes from the movie.route.js file

import { ENV_VARS } from "./CONFIG/envVars.js";
import { connectDB } from "./CONFIG/db.js";



//console.log("MONGO URI :", process.env.MONGO_URI );
const app = express();

const PORT  = ENV_VARS.PORT; // we are using the port from the env vars file

app.use(express.json()); //will allow us to parser req.body

app.use("/api/v1/auth",authRoutes); // we are using the auth path for the auth routes created in the auth.route.js file to be used
app.use("/api/v1/movie",movieRoutes); // the other ones like the signup logi nand logout croutesw will be under the auth path

app.listen (PORT,()=>{
    console.log("Server started at http://localhost:"+ PORT ); // we are using the port from the env vars file
    connectDB(); // we are connecting to the database
});

