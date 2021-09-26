const controller = require("../controllers/image.controller");

module.exports = function (app) {
  app.post("/upload", controller.uploadImage);
};
