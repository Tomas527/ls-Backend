const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
const db = require("./models");
const dbConfig = require("./config/db.config.js");
const Role = db.role;
dotenv.config();
db.mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("successfully connect to MongoDB");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "watcher",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'watcher' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to emploee application." });
});

require("./routes/auth.routes.js")(app);
require("./routes/user.routes.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
