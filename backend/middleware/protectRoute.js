 import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';
import { ENV_VARS } from '../CONFIG/envVars.js';


export const protectRoute = async (req, res, next) => {
    try {
        const token =  req.cookies["jwt-netflix"];

        if(!token){
            return res.status(401).json({success: false, message: "Unauthorized - No  Token Provided "});
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET); // we are verifying the token using the secret key
        if(!decoded){
            return res.status(401).json({success: false, message: "Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password"); // we are finding the user by the user id in the token

        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }

        next(); // if everything is fine, we will move to the next middleware or the controller
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({success: false, message: "Internal Server Error in protectRoute middleware", error: error.message});
    }
}
