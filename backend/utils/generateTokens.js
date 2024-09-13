import jwt from  "jsonwebtoken";
import { ENV_VARS } from "../CONFIG/envVars.js";


export const generateTokenAndSetCookie  = (user,res) => {
    const token = jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:"15d"}); //creates a token with the user id and the jwt secret , the user id is the payload and the jwt secret is the secret key 
    res.cookie("jwt_netflix",token,{
        httpOnly:true, //cookie can be accessed ONLY by the browser and not by the javascript code,prevernts XSS attacks
        maxAge:15*24*60*60*1000 ,//15 day in milli seconds
        sameSite : "strict",   // CSRF attacks cross site request forgery attacks 
        secure : ENV_VARS.NODE_ENV !== "development", // will only be true in https and not http i.e in localhost
    });
    return token;
}
//this function will be called in auth controller so that the token can be created and the cookie can be set