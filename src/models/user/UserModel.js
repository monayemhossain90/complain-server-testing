const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim:true,
            required: [true, "first name is required"],
            minLength: [1, "first name must be minimum 1 characters"],
            maxLength: [31, "first name must be maximum 31 characters"],
        },
        lastName: {
            type: String,
            trim:true,
            required: [true, "last name is required"],
            minLength: [1, "last must be minimum 1 characters"],
            maxLength: [31, "last must be maximum 31 characters"],
        },
         phonenumber: {
            type: String,
            required: [true, "phonenumber is required"],
            unique: true,
        },
          password: {
            type: String,
            required: [true, "password is required"],
            minlength: [6, "password must be minimum 6 characters"],
          
        },
  
        role:{
            type:String,
            enum:["admin","manager","employee","partner"],
             required: [true, "role is required"],
        },
      
      
    },
    { timestamps: true, versionKey:false}
)


const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;