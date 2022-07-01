const db = require("../models");
const ImportRegistration = db.importRegistration;
const Op = db.Sequelize.Op;

// Create and save new ImportRegistration item.
exports.create = (req, res) => {
  // Validate request.
  if (!req.body.owner_id) {
    res.status(400).send({
      message: req.body,
    });
    return;
  }

  // Create an ImportRegistration item.
  const item = {
    special_id: req.body.special_id,
    order_name: req.body.order_name,
    income_date: req.body.income_date,
    owner_id: req.body.owner_id,
  };

  // Set default values if they were not specified.
  if (!item.special_id) {
    const min = 10001;
    const max = 99999;
    item.special_id = Math.floor(Math.random() * (max - min) + min);
  }
  if (!item.order_name) {
    item.order_name = `Замовлення №${item.special_id}`;
  }

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
