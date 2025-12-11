

const ComplainModel = require("../../models/complain/ComplainModel");
const UserModel = require("../../models/user/UserModel");
const AdminHistoryModel = require("../../models/history/AdminHistoryModel");




const updateComplainStatusByManager = async (complainId,managerId, status) => {
  
  const complain = await ComplainModel.findOneAndUpdate(
    { _id: complainId },
    { status },
    { new: true }
  );

  if (!complain) {
    throw new Error("Complain not found or not assigned to this employee");
  }

  const employee = await UserModel.findById(complain.assignEmployee).select("firstName lastName");;
const manager = await UserModel.findById(managerId).select("phonenumber firstName lastName");

  // Create history
  await AdminHistoryModel.create({
    customerId: complain.customerId,
    complainNumber: complain.complainNumber,
    complainer:complain.complainer,
    phonenumber: complain.phonenumber,
    location: complain.location,
    description: complain.description,
    employeeFirstName: employee.firstName,
    employeeLastName: employee.lastName,
    managerFirstName: manager.firstName,
    managerLastName: manager.lastName,
    createComplainAt:complain.createdAt,
    completedAt:complain.completedAt,
    doneAt:complain.doneAt,
    status:complain.status,
  });



  return complain;
};



module.exports = {
  updateComplainStatusByManager
};
