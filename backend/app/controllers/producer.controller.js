const db = require("../models");
const Producer = db.producer;
const Op = db.Sequelize.Op;

// Create and save new Producer.
exports.create = (req, res) => {
  // Validate request.
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create an Producer.
  const item = {
    name: req.body.name,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    photoSrc: req.body.photoSrc,
    specialId: req.body.specialId,
    password: req.body.password,
    description: req.body.description,
  };

  Producer.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the Producer.",
      });
    });
};

// Retrieve all Producer.
exports.getItems = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Producer.getItems({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Producer.",
      });
    });
};

// Retrieve a single Producer with specified id.
exports.getItemById = (req, res) => {
  const id = req.params.id;

  Producer.getItemById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving a Producer with id ${id}`,
      });
    });
};

// Update an Producer by the id.
exports.updateItem = (req, res) => {
  const id = req.params.id;

  Producer.updateItem(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Producer was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Producer with id=${id}. Maybe Producer was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Producer with id=${id}`,
      });
    });
};

// Delete an Producer with the specified id.
exports.delete = (req, res) => {
  const id = req.params.id;

  Producer.delete({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Producer was deleted successfully" });
      } else {
        res.send({
          message: `Cannot update Producer with id=${id}. Maybe Producer was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting Producer with id=${id}`,
      });
    });
};

// Delete all Producer.
exports.deleteAll = (req, res) => {
  Producer.delete({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Producer were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Producer.",
      });
    });
};
