const AdminLoginService = require("../../services/auth/AdminLoginService");
const EmployeeLoginService = require("../../services/auth/EmployeeLoginService");
const ManagerLoginService = require("../../services/auth/ManagerLoginService");
const UserCreateService = require("../../services/user/UserCreateService");
const UserModel = require("../../models/user/UserModel");

exports.Register = async (req, res) =>{
    await UserCreateService(req,res,UserModel);
}

exports.AdminLogin=async(req,res)=>{
    await AdminLoginService(req,res,UserModel);
}

exports.ManagerLogin=async(req,res)=>{
    await ManagerLoginService(req,res,UserModel);
}

exports.EmployeeLogin=async(req,res)=>{
    await EmployeeLoginService(req,res,UserModel);
}



