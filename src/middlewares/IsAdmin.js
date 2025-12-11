const UserModel = require("../models/user/UserModel");


module.exports= async (req,res,next)=>{
    try{
        const phonenumber = req.headers.phonenumber;
        const adminUser = await UserModel.findOne( {phonenumber: phonenumber });
        if(adminUser.role !== "admin"){
            res.status(400).json("You are not an Admin")
        }
        else{
            next();
        }
    }
    catch(error) {
        res.status(500).json({message: "admin failure", result: error.toString()})
    }
}

