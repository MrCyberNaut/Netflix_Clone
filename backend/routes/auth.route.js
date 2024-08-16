// auth.route.js is named that was to show that it is a route file

import express from "express";

const router = express.Router();
app.get("/signup" , (req,res)=>{
    res.send("Signup route");
});
app.get("/login" , (req,res)=>{
    res.send("login route");
});
app.get("/logout" , (req,res)=>{
    res.send("logout route");
});
export default router;