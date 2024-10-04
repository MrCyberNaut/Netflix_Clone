import express from "express";
import { searchPerson, searchMovie, searchTv } from "../controllers/search.controller.js";
const router = express.Router();


router.get("/person/:query"); //this is an endpoint
router.get("/movie/:query"); //this is an endpoint
router.get("/tv/:query"); //this is an endpoint

export default router; 