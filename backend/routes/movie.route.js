import express from  'express';
import { get } from 'mongoose';

import { getTrendingMovie } from '../controllers/movie.controller.js';

const router = express.Router();

router.get("/trending",getTrendingMovie); // although the API return multiple movies, we will have to use only one as we have to display only one movie on the home page, but we can have a carousel effect that will browse through the movies on refreshing the page




export default router;