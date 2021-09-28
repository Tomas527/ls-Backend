const controller = require("../controllers/emploee.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/emploees", [authJwt.verifyToken], controller.getAll);
  app.put(
    "/api/emploees/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );
  app.delete(
    "/api/emploees/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};
