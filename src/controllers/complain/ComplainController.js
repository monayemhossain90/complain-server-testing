
const ComplainModel = require("../../models/complain/ComplainModel");

const DeleteService = require("../../services/common/DeleteService");
const CreateComplianService = require("../../services/Complain/CreateComplainService");
const GetPendingComplainService = require("../../services/common/GetPendingComplainsService");

const GetCompletedComplainService = require("../../services/common/GetCompletedComplainsService");
const UpdateComplainService = require("../../services/common/UpdateComplainService");
const GetDoneComplainService = require("../../services/common/GetDoneComplainsService");


// create Complain - when complain create an sms will send to customer number
exports.CreateComplain = async (req, res) =>{
    await CreateComplianService(req,res,ComplainModel);
}

// get all pending Complains
exports.GetAllPendingComplains=async(req,res)=>{
  
    await GetPendingComplainService(req,res,ComplainModel)
}

// get all completed Complains
exports.GetAllCompletedComplains=async(req,res)=>{
  
    await GetCompletedComplainService(req,res,ComplainModel)
}

// get all done Complains
exports.GetAllDoneComplains=async(req,res)=>{
  
    await GetDoneComplainService(req,res,ComplainModel)
}



// update complain by id
exports.UpdateComplainById = async (req, res) => {
  try {
    await UpdateComplainService(req, res, ComplainModel);
  } catch (err) {
    console.error("UpdateComplainById error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// delete complain by id
exports.DeleteComplainById = async (req, res) =>{
    await DeleteService(req,res,ComplainModel)

    
}





