const controller = require("../controllers/image.controller");
const multer = require("multer");

var storage = multer.diskStorage({
  url: process.env.MONGO_URI,
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage });

module.exports = function (app) {
  app.post("/upload", upload.single("file"), controller.uploadImage);
  app.get("/profileImages", controller.getAllImages);
  app.delete("/profileImages/:id", controller.deleteImage);
};
