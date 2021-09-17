const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.emploee = require("./emploee.model");
db.ROLES = ["watcher", "admin"];

module.exports = db;
