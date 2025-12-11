
 const AdminHistoryModel = require("../../models/history/AdminHistoryModel");
  const EmployeeHistoryModel = require("../../models/history/EmployeeHistoryModel");
const DeleteService = require("../../services/common/DeleteService");
const GetAdminHistoryService = require("../../services/common/GetAdminHistoryService");
const GetEmployeeHistoryService = require("../../services/common/GetEmployeeHistoryService");



// get employee history
exports.GetEmployeeHistory=async(req,res)=>{
  
    await GetEmployeeHistoryService(req,res,EmployeeHistoryModel)
}

// get admin history
exports.GetAdminHistory=async(req,res)=>{
  
    await GetAdminHistoryService(req,res,AdminHistoryModel)
}

// delete history by admin
exports.DeleteHistoryById = async (req, res) =>{
    await DeleteService(req,res,AdminHistoryModel)
}





