import {fetchFromTMDB} from '../services/tmdb.service.js';


export async function getTrendingMovie(req, res) {
	try {
		const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
		const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

		res.json({ success: true, content: randomMovie });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error in trending movie" , error: error.message , stack: error.stack, });
	}
}

 // ?. is used for chaining ........data.results?.length: The ?. is optional chaining, which ensures that if results is undefined or null, the expression returns undefined instead of throwing an error.

 export async function getMovieTrailers(req, res) {
	const {id} = req.params;  // we are getting the id from the params, the variable name should be the same as the one in the route
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
		res.json({ success: true, trailers: data.results }); //data.results cuz this is what the API returns 

	} catch (error) {
		//we have to check if it is a 404 or 500 internal server error
		if (error.message.includes("404")){
			return res.status(404).json({ success: false, message: "No trailers found" });
		}

		res.status(500).json({ success: false, message: "Internal Server Error in getting movie trailers" , error: error.message , stack: error.stack, });
	}
 }

 export async function getMovieDetails(req, res) {
	const {id} = req.params;  // we are getting the id from the params, the variable name should be the same as the one in the route
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
	} catch (error) {
		
	}
 }