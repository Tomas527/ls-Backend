const mongoose = require("mongoose");

const Image = mongoose.model(
  "Image",
  new mongoose.Schema({
    _id: String,
    image: String,
  })
);

module.exports = Image;
