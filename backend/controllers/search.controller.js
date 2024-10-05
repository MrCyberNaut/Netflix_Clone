import { User } from "../models/User.model";
import {fetchFromTMDB} from "../utils/fetchFromTMDB";   //importing the fetchFromTMDB function from the utils folder

export async function searchPerson(req, res) {
    const {query } = req.params; // query receieved as an argument from the client side 
 try {

 const response = await fetchFromTMDB (`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

 if (response.results.length === 0) {
     return res.status(404).json({success: false, message: "No results found"});
 }

 await User.findByIdAndUpdate(req.user._id, {
    $push: {
        searchHistory: 
        {id:response.results[0].id,
         image : response.results[0].profile_path,
         title: response.results[0].name,
         searchType: "person",
         createdAt : new Date(),
        },
    },
}); //commented_images\image.png

 res.status(200).json({success: true, content: response.results});
} catch (error) {
    console.log("Error in searchPerson controller", error.message); 
    res.status(500).json({success: false, message: "Internal Server Error in searchPerson controller", error: error.message});
}
}
export async function searchMovie(req, res) {
    const {query} = req.params;
    try {
        const response = await fetchFromTMDB (`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.length === 0) {
            return res.status(404).json({success: false, message: "No results found"});
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: 
                {id:response.results[0].id,
                 image : response.results[0].poster_path,
                 title: response.results[0].name,
                 searchType: "movie",
                 createdAt : new Date(),
                },
            },
        }); //commented_images\image.png
         res.status(200).json({success: true, content: response.results});
    } catch (error) {
        console.log("Error in searchMovie controller", error.message); 
        res.status(500).json({success: false, message: "Internal Server Error in searchPerson controller", error: error.message});
    }
}
export async function searchTv(req, res) {
    try {
        const {query} = req.params;
        const response = await fetchFromTMDB (`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.length === 0) {
            return res.status(404).json({success: false, message: "No results found"});
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: 
                {id:response.results[0].id,
                 image : response.results[0].poster_path,
                 title: response.results[0].name,
                 searchType: "tv",
                 createdAt : new Date(),
                },
            },
        }); //commented_images\image.png
         res.status(200).json({success: true, content: response.results});
    } catch (error) {
        console.log("Error in searchTvcontroller", error.message); 
    res.status(500).json({success: false, message: "Internal Server Error in searchPerson controller", error: error.message});
    }
}