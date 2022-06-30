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
    order_name: req.body.order_name,
    income_date: req.body.income_date,
    items: req.body.items,
    owner_id: req.body.owner_id,
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
  const order_name = req.query.order_name;
  const condition = order_name
    ? { order_name: { [Op.iLike]: `%${norder_nameme}%` } }
    : null;

  ImportRegistration.findAll({ where: condition })
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

  ImportRegistration.findByPk(id)
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

  ImportRegistration.destroy({ where: { id } })
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
