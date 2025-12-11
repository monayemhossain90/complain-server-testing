const mongoose = require("mongoose");

const AdminHistorySchema = new mongoose.Schema(
  {
    complainNumber: {
      type: Number,
    },

    customerId: {
      type: String,
      trim: true,
      required: [true, "customer phonenumber is required"],
    },

      complainer: {
      type: String,
      trim: true,
      required: [true, "complainer  is required"],
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
    doneAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      default: "done",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("AdminHistory", AdminHistorySchema);
