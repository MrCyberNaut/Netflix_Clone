import { User } from "../models/user.model.js"; //importing the User model from the models folder
import {fetchFromTMDB} from "../services/tmdb.service.js";   //importing the fetchFromTMDB function from the utils folder

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

export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({success: true, content: req.user.searchHistory}); //req.user.searchHistory is the search history of the user and it was possible bexuase we have delcared the user in the middleware
    } catch (error) {
        console.log("Error in getSearchHistory controller", error.message); 
        res.status(500).json({success: false, message: "Internal Server Error in getSearchHistory controller", error: error.message});
    }
}


export async function removeItemFromSearchHistory(req, res) {
    const {id} = req.params; // what we get here is string and therefore when we compare it with the id in the searchHistory we have to convert it to number becuase the id in the searchHistory is a number and not a string 

    id = parseInt(id); //converting the id to a number

    try {    
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: {id:id},
            },
        });
        res.status(200).json({success: true, message: "Item removed from search history"});
    } catch (error) {
        console.log("Error in removeItemFromSearchHistory controller", error.message); 
        res.status(500).json({success: false, message: "Internal Server Error in removeItemFromSearchHistory controller", error: error.message});
    }
}