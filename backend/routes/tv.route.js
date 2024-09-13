import express from 'express';
import { getTrendingTv, getSimilarTvs,getTvDetails,getTvTrailers,getTvsByCategory } from '../controllers/tv.controller.js';

const router = express.Router();


router.get("/trending",getTrendingTv);
router.get("/:id/trialers",getTvTrailers);
router.get("/:id/details",getTvDetails);
router.get("/:id/similar",getSimilarTvs);   

router.get("/category",getTvsByCategory); 




export default router;

// movie and tv controllers are similar, the only difference is the URL and the API endpoint, it could be merged in a single controller file, but for better readability and maintainability, we have separated them into two different files. u could do that by send the type as a parameter in the URL and then use it to determine the type of the media to fetch, whether it is a movie or a tv show.