// const express = require('express); // commonJS
import express from "express";  // ems emmascript
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js"; // we are importing the routes from the auth.route.js file
import movieRoutes from "./routes/movie.route.js" // we are importing the routes from the movie.route.js file
import tvRoutes from "./routes/tv.route.js" ;// we are importing the routes from the tv.route.js file
import searchRoutes from "./routes/search.route.js" ;

import { ENV_VARS } from "./CONFIG/envVars.js";
import { connectDB } from "./CONFIG/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

//console.log("MONGO URI :", process.env.MONGO_URI );
const app = express();

const PORT  = ENV_VARS.PORT; // we are using the port from the env vars file

app.use(express.json()); //will allow us to parser req.body
app.use(cookieParser()); // we are using the cookie parser to parse the cookies

app.use("/api/v1/auth",authRoutes); // we are using the auth path for the auth routes created in the auth.route.js file to be used
app.use("/api/v1/movie",protectRoute,movieRoutes); // the other ones like the signup logi nand logout croutesw will be under the auth path
app.use("/api/v1/tv",protectRoute, tvRoutes); 
app.use("/api/v1/tv",protectRoute, searchRoutes);


app.listen (PORT,()=>{
    console.log("Server started at http://localhost:"+ PORT ); // we are using the port from the env vars file
    connectDB(); // we are connecting to the database
});

