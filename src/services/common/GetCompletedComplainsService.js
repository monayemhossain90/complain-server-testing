const GetCompletedComplainService = async (req, res, Model) => {
    try {
        const data = await Model.aggregate([
            // Match only documents with status "pending"
            { $match: { status: "completed" } },

            // Lookup assigned employee
      {
        $lookup: {
          from: "users",
          localField: "assignEmployee",
          foreignField: "_id",
          as: "assignEmployee",
        },
      },
      { $unwind: "$assignEmployee" },

      // Lookup manager
      {
        $lookup: {
          from: "users",
          localField: "manager",
          foreignField: "_id",
          as: "manager",
        },
      },
      { $unwind: "$manager" },

      // Project required fields
      {
        $project: {
          _id: 1,
          customerId: 1,
          complainNumber: 1,
          phonenumber: 1,
          location: 1,
          description: 1,
          status: 1,
          complainer: 1,
          employeeFirstName: "$assignEmployee.firstName",
          employeeLastName: "$assignEmployee.lastName",
          managerFirstName: "$manager.firstName",
          managerLastName: "$manager.lastName",
          createdAt: 1,
          completedAt:1
        },
      },
            // Sort by creation date descending
            { $sort: { createdAt: -1 } },
        ]);

        res.status(200).json({ message: "success", data: data });
    } catch (error) {
        res.status(500).json({ message: "error", data: error.toString() });
    }
}

module.exports = GetCompletedComplainService;
