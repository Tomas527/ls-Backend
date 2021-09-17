const mongoose = require("mongoose");
const Emploee = mongoose.model(
  "Emploee",
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    roll: String,
  })
);

module.exports = Emploee;
