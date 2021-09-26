const mongoose = require("mongoose");

const Image = mongoose.model(
  "Image",
  new mongoose.Schema({
    userId: String,
    image: {
      data: Buffer,
      contentType: String,
    },
  })
);

module.exports = Image;
