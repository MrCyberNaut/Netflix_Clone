import { User } from "../models/User.model";

export async function searchPerson(req, res) {
    const {query } = req.params; // query receieved as an argument from the client side 
 try {

 const response = await fetchFromTMDB (`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

 if (response.results.length === 0) {
     return res.status(404).json({success: false, message: "No results found"});
 }

 await User.findByIdAndUpdate(req.user._id, {$push: {searchHistory: {query, type: "person"}}});

 res.status(200).json({success: true, content: response.results});
} catch (error) {
    console.log("Error in searchPerson controller", error.message);
    res.status(500).json({success: false, message: "Internal Server Error in searchPerson controller", error: error.message});
}
}
export async function searchMovie(req, res) {
    
}
export async function searchTv(req, res) {
    
}