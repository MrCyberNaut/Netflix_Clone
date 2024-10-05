import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true ,
        unique : true ,
    },
    email : {
        type : String,
        required : true ,
        unique : true ,
    },
    password: {
        type : String , 
        required : true ,

    },
    searchHistory : {
        type : Array ,
        deafult : [],
    },
    image:{
        type : String,
        default :  "",

    }

});

export const User = mongoose.models.User || mongoose.model('User', userSchema);//creates a user model , create a user collection thats based of userSchema 
// the first letter in User for model has to be capital and the word has to be singular , mongoose automatically changes it to plural