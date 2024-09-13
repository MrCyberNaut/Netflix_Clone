// auth.route.js is named that was to show that it is a route file

import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js"; // the .js is neeed as we have the type as module in the package cuz we are importing files from local machine 

const router = express.Router();
router.post("/signup" , signup); // user sendng data
router.post("/login" , login);
router.post("/logout" , logout);

router.get("/authCheck", protectRoute, authCheck);

export default router;
