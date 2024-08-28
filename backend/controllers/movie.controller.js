import {fetchFromTMDB} from '../services/tmdb.service.js ';

export async function getTrendingMovie(req, res) {
    try {
        const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;
        const data = await fetchFromTMDB(url);
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)] =   // ?. is used for chaining ........data.results?.length: The ?. is optional chaining, which ensures that if results is undefined or null, the expression returns undefined instead of throwing an error.


        res.json({success : true, content: randomMovie}); //we say content and not movie or something like that for a reason, content is the generic name for movies and TVshows
    } catch (error) {
        res.status(500).json({ success:false, message: "Internal Server Error" });
    }
}   