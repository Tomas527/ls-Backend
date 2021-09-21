const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      email: String,
      password: String,
      phone: String,
      address: String,
      roll: String,
      profileImage: String,
      isHired: { type: Boolean, default: false },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
    },
    { timestamps: true }
  )
);

module.exports = User;
