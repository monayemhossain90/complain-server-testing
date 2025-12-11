const mongoose = require("mongoose");

const GetEmployeeHistoryService = async (req, res, Model) => {
  try {
    const employeeId = req.headers.id; // from AuthVerifyMiddleware

    const data = await Model.aggregate([
      {
        $match: {
          status: "completed",
          employeeId: new mongoose.Types.ObjectId(employeeId), // must be ObjectId
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    res.status(200).json({ message: "success", data });
  } catch (error) {
    res.status(500).json({ message: "error", data: error.toString() });
  }
};

module.exports = GetEmployeeHistoryService;
