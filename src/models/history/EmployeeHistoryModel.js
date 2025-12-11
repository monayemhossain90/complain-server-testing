const mongoose = require("mongoose");

const EmployeeHistorySchema = new mongoose.Schema(
  {
    complainNumber: {
      type: Number,
    },

    customerId: {
      type: String,
      trim: true,
      required: [true, "customer phonenumber is required"],
    },

    phonenumber: {
      type: String,
      trim: true,
      required: [true, "customer phonenumber is required"],
      minLength: [11, "phonenumber must be min 11 characters"],
    },

    location: {
      type: String,
      trim: true,
      required: [true, "customer location is required"],
    },

    description: {
      type: String,
      trim: true,
      required: [true, "Complain descripiton  is required"],
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Employee Id is required"],
    },
    employeeFirstName: {
      type: String,

      required: true,
    },
    employeeLastName: {
      type: String,

      required: true,
    },
    managerFirstName: {
      type: String,

      required: true,
    },
    managerLastName: {
      type: String,

      required: true,
    },

        createComplainAt: {
      type: Date,
      default: null,
    },

       completedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      default: "completed",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("EmployeeHistory", EmployeeHistorySchema);
