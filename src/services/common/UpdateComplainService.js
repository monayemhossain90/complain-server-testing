const mongoose = require("mongoose");
const axios = require("axios");
const UserModel = require("../../models/user/UserModel");

const sendSMS = async (number, message) => {
  if (!number) {
    console.log("No phone number provided for SMS:", message);
    return;
  }

  try {
    // Use numeric sender ID registered with BulkSMSBD
    const smsUrl = `http://bulksmsbd.net/api/smsapi?api_key=${process.env.BULK_SMS_BD_API_KEY}&type=text&number=${number}&senderid=${process.env.SMS_SENDER_ID}&message=${encodeURIComponent(message)}`;

    const response = await axios.get(smsUrl);
    console.log(`SMS sent to ${number}:`, response.data);

    // Check if API returned error
    if (response.data.response_code !== 1000) {
      console.error(`SMS failed for ${number}:`, response.data.error_message);
    }
  } catch (err) {
    console.error("SMS sending failed:", err.response?.data || err.message);
  }
};

const UpdateComplainService = async (req, res, ComplainModel) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid complain ID" });
    }

    // Only allow these fields
    const allowedUpdates = ["description", "status", "assignEmployee", "location"];
    const updateData = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) updateData[key] = req.body[key];
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update" });
    }

 
    // Fetch existing complain
    const existingComplain = await ComplainModel.findById(id);
    if (!existingComplain) {
      return res.status(404).json({ message: "Complain not found" });
    }

    const oldAssignEmployeeId = existingComplain.assignEmployee?.toString();

    // Update complain
    const updatedComplain = await ComplainModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate("assignEmployee", "firstName lastName role phonenumber")
      .populate("manager", "firstName lastName role phonenumber");

    if (!updatedComplain) {
      return res.status(404).json({ message: "Complain not found after update" });
    }

    // Send SMS if assignEmployee changed
    if (updateData.assignEmployee && oldAssignEmployeeId !== updateData.assignEmployee) {
      const newEmployee = await UserModel.findById(updateData.assignEmployee);
      const oldEmployee = oldAssignEmployeeId ? await UserModel.findById(oldAssignEmployeeId) : null;

      const smsPromises = [];

      if (newEmployee?.phonenumber) {
        smsPromises.push(
          sendSMS(
            newEmployee.phonenumber,
            `A complain has been assigned to you. Complain ${updatedComplain.complainNumber}. Customer phone: ${updatedComplain.phonenumber} and PPPoE is ${updatedComplain.customerId} - E-Jogajog`
          )
        );
      }

      if (oldEmployee?.phonenumber) {
        smsPromises.push(
          sendSMS(
            oldEmployee.phonenumber,
            `Complain ${updatedComplain.complainNumber} has been reassigned to another employee - E-Jogajog`
          )
        );
      }

      await Promise.all(smsPromises);
    }

    return res.status(200).json({ message: "Complain updated successfully", data: updatedComplain });
  } catch (error) {
    console.error("UpdateComplainService error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = UpdateComplainService;
