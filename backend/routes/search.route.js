import express from "express";
import { searchPerson, searchMovie, searchTv, removeItemFromSearchHistory, getSearchHistory } from "../controllers/search.controller.js";
const router = express.Router();


router.get("/person/:query"); //this is an endpoint
router.get("/movie/:query"); //this is an endpoint
router.get("/tv/:query"); //this is an endpoint

router.get("/history", getSearchHistory);
router.delete("/history/:id", removeItemFromSearchHistory);

export default router; 