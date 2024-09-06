import express from 'express';

const router = express.Router();


router.get("/trending",getTrendingTv);
router.get("/:id/trialers",getTvTrailers);
router.get("/:id/details",getTvDetails);
router.get("/:id/similar",getSimilarTvs);   

router.get("/category",getTvsByCategory); 




export default router;