import express from  "express";
import { getTrendingMovie } from "../controllers/movie.controller.js";
import { getMovieTrailers } from "../controllers/movie.controller.js";
import { getMovieDetails } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending",getTrendingMovie);
router.get("/:id/trialers",getMovieTrailers);
router.get("/:id/details",getMovieDetails);
//router.get("/:id/similar",getSimilarMovies);   




export default router;


 // although the API return multiple movies, we will have to use only one as we have to display only one movie on the home page, but we can have a carousel effect that will browse through the movies on refreshing the page