const axios = require("axios");
const ComplainModel = require("../../models/complain/ComplainModel");
const UserModel = require("../../models/user/UserModel");
const EmployeeHistoryModel = require("../../models/history/EmployeeHistoryModel");
const mongoose = require("mongoose");


;

const getAllComplainsByEmployee = async (employeeId) => {
  return await ComplainModel.find({
      assignEmployee: employeeId,
      status: "pending",
    })
    .populate("assignEmployee", "firstName lastName") // fetch only names
    .populate("manager", "firstName lastName")
    .sort({ createdAt: -1 });
};


// // Get all  employees
// const getAllEmployees = async () => {
//     try {
//     // Fetch all users with role = "employee"
//     const employees = await UserModel.find({ role: "employee" })
//     return employees;
//   } catch (error) {
//     throw new Error(error.message);
//   }
    
// };

// Get all employees & partners
const getAllEmployees = async () => {
  try {
    // Fetch users with role = "employee" or "partner"
    const users = await UserModel.find({
      role: { $in: ["employee", "partner"] }
    });

    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};




const sendSMS = async (number, message, apiKey) => {
  if (!number) return;
  const smsUrl = `http://bulksmsbd.net/api/smsapi?api_key=${apiKey}&type=text&number=${number}&senderid=8809617620042&message=${encodeURIComponent(message)}`;
  try {
    await axios.get(smsUrl);
  } catch (err) {
    console.error(`Failed to send SMS to ${number}:`, err.message);
  }
};


const updateComplainByEmployee = async (complainId, employeeId, status) => {
  
  const complain = await ComplainModel.findOneAndUpdate(
    { _id: complainId, assignEmployee: new mongoose.Types.ObjectId(employeeId) },
    { status },
    { new: true }
  );

  if (!complain) {
    throw new Error("Complain not found or not assigned to this employee");
  }

  const employee = await UserModel.findById(employeeId);
const manager = await UserModel.findById(complain.manager).select("phonenumber firstName lastName");

  // Create history
  await EmployeeHistoryModel.create({
    customerId: complain.customerId,
    complainNumber: complain.complainNumber,
    complainer:complain.complainer,
    phonenumber: complain.phonenumber,
    location: complain.location,
    description: complain.description,
    employeeId:employeeId,
    employeeFirstName: employee.firstName,
    employeeLastName: employee.lastName,
    managerFirstName: manager.firstName,
    managerLastName: manager.lastName,
    createComplainAt:complain.createdAt,
    completedAt:complain.completedAt,
    status:complain.status,
  });

  //  If status is completed → notify manager
  if (complain.status === "completed") {
    
   
      const apiKey = process.env.BULK_SMS_BD_API_KEY;
      const message = `Complain #${complain.complainNumber} has been marked as completed by ${employee.firstName} ${employee.lastName}. - E-Jogajog`;
      sendSMS(manager.phonenumber, message, apiKey); 
    
  }

  return complain;
};



module.exports = {
  getAllComplainsByEmployee,
  updateComplainByEmployee,
  getAllEmployees
};
