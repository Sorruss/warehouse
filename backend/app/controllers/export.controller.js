const db = require("../models");
const Export = db.export;
const Op = db.Sequelize.Op;

// Create and save new Export item.
exports.create = (req, res) => {
  // Validate request.
  if (!req.body.ordered_quantity || !req.body.item_id || !req.body.owner_id) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create an Export item.
  const item = {
    ordered_quantity: req.body.ordered_quantity,
    item_id: req.body.item_id,
    owner_id: req.body.owner_id,
  };

  Export.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the Export item.",
      });
    });
};

// Retrieve all Export items.
exports.getItems = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Export.findAll({ where: condition, include: db.items })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Export items.",
      });
    });
};

// Retrieve a single Export item with specified id.
exports.getItemById = (req, res) => {
  const id = req.params.id;

  Export.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving a Export item with id ${id}`,
      });
    });
};

// Update an Export item by the id.
exports.updateItem = (req, res) => {
  const id = req.params.id;

  Export.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Export item was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Export item with id=${id}. Maybe item was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Export item with id=${id}`,
      });
    });
};

// Delete an Export item with the specified id.
exports.delete = (req, res) => {
  const id = req.params.id;

  Export.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Export item was deleted successfully" });
      } else {
        res.send({
          message: `Cannot update Export item with id=${id}. Maybe Export item was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting Export item with id=${id}`,
      });
    });
};

// Delete all Export items.
exports.deleteAll = (req, res) => {
  Export.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Export items were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Export items.",
      });
    });
};
