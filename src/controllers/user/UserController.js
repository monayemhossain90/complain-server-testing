const UserCreateService = require("../../services/user/UserCreateService");
const UserModel = require("../../models/user/UserModel");
const GetAllService = require("../../services/common/GetAllService");

const UpdateService = require("../../services/common/UpdateService");
const DeleteService = require("../../services/common/DeleteService");

// create user
exports.CreateUser = async (req, res) =>{
    await UserCreateService(req,res,UserModel);
}

// get all users
exports.GetAllUsers=async(req,res)=>{
    const projection = {$project: {_id:1, phonenumber:1, firstName:1, lastName:1, role:1,}}
    await GetAllService(req,res,UserModel, projection)
}



//  update user by id
exports.UpdateUserById = async (req, res) =>{
    await UpdateService(req,res,UserModel)
}

// delete user by id
exports.DeleteUserById = async (req, res) =>{
    await DeleteService(req,res,UserModel)
}









