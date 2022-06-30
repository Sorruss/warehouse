const db = require("../models");
const ImportRegistration = db.importRegistration;
const Op = db.Sequelize.Op;

// Create and save new ImportRegistration item.
exports.create = (req, res) => {
  // Validate request.
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create an ImportRegistration item.
  const item = {
    name: req.body.name,
    date: req.body.date,
    items: req.body.items,
  };

  ImportRegistration.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while creating the ImportRegistration item.",
      });
    });
};

// Retrieve all ImportRegistration items.
exports.getItems = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  ImportRegistration.getItems({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving ImportRegistration items.",
      });
    });
};

// Retrieve a single ImportRegistration item with specified id.
exports.getItemById = (req, res) => {
  const id = req.params.id;

  ImportRegistration.getItemById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving a ImportRegistration item with id ${id}`,
      });
    });
};

// Delete an ImportRegistration item with the specified id.
exports.delete = (req, res) => {
  const id = req.params.id;

  ImportRegistration.delete({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "ImportRegistration item was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot update ImportRegistration item with id=${id}. Maybe ImportRegistration item was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error deleting ImportRegistration item with id=${id}`,
      });
    });
};
