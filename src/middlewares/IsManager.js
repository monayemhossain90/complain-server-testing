const UserModel = require("../models/user/UserModel");


module.exports= async (req,res,next)=>{
    try{
        const phonenumber = req.headers.phonenumber;
        const managerUser = await UserModel.findOne( {phonenumber: phonenumber });
        if(managerUser.role !== "manager"){
            res.status(400).json("You are not a Manager")
        }
        else{
            next();
        }
    }
    catch(error) {
        res.status(500).json({message: "manager failure", result: error.toString()})
    }
}

