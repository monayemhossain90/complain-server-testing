// const mongoose = require("mongoose");
// const UpdateService= async (req, res,DataModel) => {

//     try{
//         let ID = req.params.id;
//         const ObjectId = mongoose.Types.ObjectId;
//         let UpdateQueryObject = {_id: new ObjectId(ID)};
//         let PostBody=req.body;
//         if (PostBody.phonenumber) {
            
//         } else {
            
//         }

//         let Update = await DataModel.updateOne(UpdateQueryObject,PostBody);
//         res.status(200).json({message: "success", data: Update});

//     }
//     catch (error) {
//         res.status(500).json({message: "error", data: error});
//     }
// }
// module.exports=UpdateService


const mongoose = require("mongoose");
const hashedPassword = require("../../utility/hashedPassword");


const UpdateService = async (req, res, DataModel) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Check if user exists
    const existingUser = await DataModel.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔒 Hash password if provided
    if (updateData.password) {
      updateData.password = await hashedPassword(updateData.password);
    }

    // Perform update
    const updatedUser = await DataModel.findByIdAndUpdate(id, updateData, {
      new: true, // return the updated document
      runValidators: true, // enforce schema validation
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("UpdateService error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = UpdateService;
