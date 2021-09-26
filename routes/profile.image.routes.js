const controller = require("../controllers/image.controller");
var bodyParser = require("body-parser");

module.exports = function (app) {
  // app.use(bodyParser());
  app.post("/upload", function (req, res) {
    console.log(req.body);
  });
};
