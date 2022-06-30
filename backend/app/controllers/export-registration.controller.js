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
    order_name: req.body.order_name,
    income_date: req.body.income_date,
    items: req.body.items,
    owner_id: req.body.owner_id,
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
  const order_name = req.query.order_name;
  const condition = order_name
    ? { order_name: { [Op.iLike]: `%${order_name}%` } }
    : null;

  ExportRegistration.findAll({ where: condition })
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

  ExportRegistration.findByPk(id)
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

  ExportRegistration.destroy({ where: { id } })
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
