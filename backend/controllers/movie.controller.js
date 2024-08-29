import {fetchFromTMDB} from '../services/tmdb.service.js';

export async function getTrendingMovie(req, res) {
	try {
		const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
		const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

		res.json({ success: true, content: randomMovie });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error in movie controller" });
	}
}

 // ?. is used for chaining ........data.results?.length: The ?. is optional chaining, which ensures that if results is undefined or null, the expression returns undefined instead of throwing an error.