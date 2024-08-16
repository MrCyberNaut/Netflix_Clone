// auth.route.js is named that was to show that it is a route file

import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js"; // the .js is neeed as we have the type as module in the package cuz we are importing files from local machine 

const router = express.Router();
app.get("/signup" , signup);
app.get("/login" , login);
app.get("/logout" , logout);
export default router;