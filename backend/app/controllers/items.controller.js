const db = require("../models");
const Item = db.items;
const Op = db.Sequelize.Op;

// Create and save new item.
exports.create = (req, res) => {
  // Validate request.
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create an Item.
  const item = {
    name: req.body.name,
    date: req.body.date,
    quantity: req.body.quantity,
    producer: req.body.producer,
    description: req.body.description,
  };

  Item.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while creating the Item.",
      });
    });
};

// Retrieve all Items.
exports.getItems = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Item.getItems({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};

// Retrieve a single item with specified id.
exports.getItemById = (req, res) => {
  const id = req.params.id;

  Item.getItemById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving an item with id ${id}`,
      });
    });
};

// Update an Item by the id.
exports.updateItem = (req, res) => {
  const id = req.params.id;

  Item.updateItem(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Item was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Item with id=${id}`,
      });
    });
};

// Delete an Item with the specified id.
exports.delete = (req, res) => {
  const id = req.params.id;

  Item.delete({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Item was deleted successfully" });
      } else {
        res.send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting Item with id=${id}`,
      });
    });
};

// Delete all Items.
exports.deleteAll = (req, res) => {
  Item.delete({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Items were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all items.",
      });
    });
};
