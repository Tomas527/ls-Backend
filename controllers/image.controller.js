const db = require("../models");
const multer = require("multer");

const fs = require("fs");
const Image = db.image;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

exports.uploadImage = async (req, res, next) => {
  try {
    console.log(req.body);
    await upload.single("file");
    console.log(req.body);
    const file = req.file;
    const id = req.body.id;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(file);
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString("base64");
    const image = new Image({
      userId: req.body.id,
      image: {
        data: Buffer(encode_image, "base64"),
        contentType: req.file.mimetype,
      },
    });
    image.save((err, img) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({
        id: image.id,
        img,
      });
    });
  } catch (err) {
    console.log("error retriving file");
    console.log(err);
  }
};

// exports.uploadImage = async (req, res) => {
//     try {
//       console.log(req.body);
//       await uploadProfileImage(req, res);
//       if (req.file === undefined) {
//         return res.send(`You must select a file.`);
//       }
//       return res.send("Image has beem uploaded");
//       // return res.send("{ fileId: res.req.file.id }");
//     } catch (error) {
//       return res.status(500).send(`Error when tryings upload image: ${error}`);
//     }
//   };
