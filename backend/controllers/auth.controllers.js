import { User } from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokens.js";
export async function signup (req,res){
   try {
     const {email,password,username} = req.body;  //email and all coming from req body object 
     
     if ( !email || !password || !username ){
         return res.staus(400).json({success:false,message:"All fields are required "});
   } 

   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; //email regex

   if (!emailRegex.test(email)){
    return res.status(400).json({success:false,message:"Invalid Email !"});
   }
   if(password.length < 6){
    return res.status(400).json({success:false,message: " Password must be atleast 6 characters "});
   }

   const existingUserByEmail = await User.findOne({email:email});
   
   if (existingUserByEmail){
    return res.status(400).json({success:false,message:"Email already exists"});
   }
 
    const existingUserByUsername = await User.findOne({username : username});

    if (existingUserByUsername){
        return res.status(400).json({success:false,message:"Username already exists"})  ;
    }
     const salt = await bcryptjs.genSalt(10); //this is to generate a salt for the password`
     const hashedPassword = await bcryptjs.hash(password,salt); //this is to hash the password
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png" , "avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]; //random pf pic

    const newUser = new User({
        email,
        password,
        username,
        image,
 })
 //creatred user should be saved in database
 
    generateTokenAndSetCookie(newUser._id,res);
    await newUser.save(); // saving user to the database

    res.status(201).json({success:true,
        user : {
       ...newUser._doc, // this is to show the user
       password : "" ,
         } // this is to hide the password from the user
    });// this is to end a request to let them know that the user has been created successfully
 


}   catch (error) {
        console.log("Error on signup controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
}
}

export async function login (req,res){
   try {
         const{email , password } = req.body; // we wnat the email and password for login no need for username 

         if( !email || !password){
            return res.status(400).json({success:false,message:"All fields are required"});
         }

         const user = await User.findOne({email:email});
            if (!user){
                return res.status(404).json({success:false,message:"Invalid credentials"}); //general message so as to not give away too much information of whats wrong email or password
            }

            const isPasswordCorrect = await bcryptjs.compare(password,user.password);//compares the userpassword with database password

            if(!isPasswordCorrect){
                return res.status(400).json({success:false,message:"Invalid credentials"}); //general message so as to not give away too much information of whats wrong email or password
            }

            generateTokenAndSetCookie(user._id,res); //if everything is correct do this 

            res.status(200).json({success:true,
                user : {
                    ...user._doc,
                    password : ""
                } //returns user object by deleteing the password
            });
   } catch (error) {
    
   }
};

export async function logout (req,res){
    try {
        res.clearCookie("jwt-token");
        res.status(200).json({success:true,message:"Logged out successfully"});
    } catch (error) {
        console.log("Error on logout controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
};