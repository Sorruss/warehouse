const db = require("../models");
const ExportRegistration = db.exportRegistration;
const Op = db.Sequelize.Op;

// Create and save new ExportRegistration item.
exports.create = (req, res) => {
  // Validate request.
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create an ExportRegistration item.
  const item = {
    name: req.body.name,
    date: req.body.date,
    items: req.body.items,
  };

  ExportRegistration.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while creating the ExportRegistration item.",
      });
    });
};

// Retrieve all ExportRegistration items.
exports.getItems = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  ExportRegistration.getItems({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving ExportRegistration items.",
      });
    });
};

// Retrieve a single ExportRegistration item with specified id.
exports.getItemById = (req, res) => {
  const id = req.params.id;

  ExportRegistration.getItemById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving a ExportRegistration item with id ${id}`,
      });
    });
};

// Delete an ExportRegistration item with the specified id.
exports.delete = (req, res) => {
  const id = req.params.id;

  ExportRegistration.delete({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "ExportRegistration item was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot update ExportRegistration item with id=${id}. Maybe ExportRegistration item was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error deleting ExportRegistration item with id=${id}`,
      });
    });
};
