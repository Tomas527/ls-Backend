const db = require("../models");
const Emploee = db.emploee;

exports.getAll = (req, res) => {
  Emploee.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong: fetching list",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Emploee.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found Emploee with id " + id });
      } else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retriving emploee with id " + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  Emploee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update emploee with id=${id}. maybe emploee was not found`,
        });
      } else {
        res.send({ message: "Emploee was updated successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating emploee with id " + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Emploee.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete emploee with id =${id}. maybe emploee was not found`,
        });
      } else {
        res.send({ message: "emploee was deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete emploee with id " + id,
      });
    });
};

exports.create = (req, res) => {
  const emploee = new Emploee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    address: req.body.address,
    roll: req.body.roll,
  });
  emploee
    .save(emploee)
    .then((date) => {
      res.send(date);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong: creating emploee",
      });
    });
};