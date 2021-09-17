const controller = require("../controllers/emploee.controller");

module.exports = function (app) {
  app.post("/api/emploees", controller.create);
  app.get("/api/emploees", controller.getAll);
  app.get("/api/emploees/:id", controller.findOne);
  app.put("/api/emploees/:id", controller.update);
  app.delete("/api/emploees/:id", controller.delete);
};
