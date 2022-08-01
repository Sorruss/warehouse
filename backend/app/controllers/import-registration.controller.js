const { ImportOrder, RegistrationModel } = require("../models");

// Create and save new ImportRegistration item.
exports.create = async (req, res) => {
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
    item.order_name = item.special_id;
  }

  await ImportOrder.create(item)
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
exports.getItems = async (req, res) => {
  await ImportOrder.findAll({
    where: { owner_id: req.user.id },
    order: [["id", "desc"]],
  })
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
exports.getItemById = async (req, res) => {
  const id = req.params.id;

  await ImportOrder.findByPk(id, { include: RegistrationModel })
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
exports.delete = async (req, res) => {
  const id = req.params.id;

  await ImportOrder.destroy({ where: { id } })
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
