import jwt from  "jsonwebtoken";
import { ENV_VARS } from "../CONFIG/envVars.js";


export const generateTokenAndSetCookie  = (user,res) => {
    const token = jwt.sign({id:user._id},ENV_VARS.JWT_SECRET,{expiresIn:"15d"}); //creates a token with the user id and the jwt secret , the user id is the payload and the jwt secret is the secret key 
    res.cookie("jwt_netflix",token,{
        httpOnly:true,
        maxAge:30*24*60*60*1000 //30 days
    });
    return token;
}
