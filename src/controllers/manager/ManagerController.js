
const EmployeeService = require("../../services/employee/EmployeeService");

const ManagerService = require("../../services/manager/ManagerService");


// get all employees
exports.GetAllEmployees=async(req,res)=>{
   try {
    const employees = await EmployeeService.getAllEmployees();

    res.status(200).json({
      message: "success",
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
}


// update complain status by manager
exports.UpdateComplainStatusByManager = async (req, res) => {
  try {
    const managerId = req.headers.id;;
    const complainId = req.params.id;
    const { status } = req.body; // only status is updatable

    const updatedComplain = await ManagerService.updateComplainStatusByManager(
      complainId,
      managerId,
      status
    );

    if (!updatedComplain) {
      return res.status(404).json({
        success: false,
        message: "Complain not found or not assigned to you",
      });
    }

  
    return res.status(200).json({
      success: true,
      message: "Complain updated successfully",
      data: updatedComplain,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update complain",
      error: error.message,
    });
  }
};




