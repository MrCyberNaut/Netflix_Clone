import { User } from "../models/User.model.js";
import bcryptjs from "bcryptjs";
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
 

 
 await newUser.save();
 res.status(201).json({success:true,
     user : {
    ...newUser._doc, // this is to show the user
    password : "" ,
      } // this is to hide the password from the user
 });// this is to end a request to let them know that the user has been created successfully

}catch (error) {
    console.log("Error on signup controller",error.message);
    res.status(500).json({success:false,message:"Internal server error"});
}
}

export async function login (req,res){
    res.send("Login route");
};

export async function logout (req,res){
    res.send("Logout route");
};