const db = require("../models");

const fs = require("fs");
const Image = db.image;

exports.uploadImage = async (req, res, next) => {
  try {
    const file = req.file;
    const id = req.body.id;

    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString("base64");
    const image = new Image({
      _id: id,
      image: encode_image,
    });
    image.save((err, image) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({
        image,
      });
    });
  } catch (err) {
    console.log("error retriving file");
    console.log(err);
  }
};

exports.getAllImages = (req, res) => {
  Image.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong: fetching list",
      });
    });
};

exports.deleteImage = (req, res) => {
  const id = req.params.id;

  Image.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete image with id =${id}. maybe image was not found`,
        });
      } else {
        res.send({ message: "image was deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete image with id " + id,
      });
    });
};
