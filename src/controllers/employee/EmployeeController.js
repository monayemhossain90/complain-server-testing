const EmployeeService = require("../../services/employee/EmployeeService");

// get all complains that assigned to an employee
exports.GetAllComplainsByEmployee = async (req, res) => {
  try {
    const employeeId = req.headers.id; // from AuthVerifyMiddleware
    const complains = await EmployeeService.getAllComplainsByEmployee(employeeId);
    if (complains.length>0) {
         return res.status(200).json({
      success: true,
      message: "Complains fetched successfully",
      data: complains,
    });
    } else {
             return res.status(404).json({
      
      message: "No complains found for you",
     
    });
      
      
    }

 
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch complains",
      error: error.message,
    });
  }
};


// update complain status by employee
exports.UpdateComplainByEmployee = async (req, res) => {
  try {
    const employeeId = req.headers.id;;
    const complainId = req.params.id;
    const { status } = req.body; // only status is updatable

    const updatedComplain = await EmployeeService.updateComplainByEmployee(
      complainId,
      employeeId,
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
