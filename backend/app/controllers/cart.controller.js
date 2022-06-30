const db = require("../models");
const Cart = db.cart;
const Op = db.Sequelize.Op;

// Create and save new Cart item.
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
    orderedQuantity: req.body.orderedQuantity,
    itemId: req.body.itemId,
  };

  Cart.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the cart item.",
      });
    });
};

// Retrieve all Cart items.
exports.getItems = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Cart.getItems({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cart items.",
      });
    });
};

// Retrieve a single Cart item with specified id.
exports.getItemById = (req, res) => {
  const id = req.params.id;

  Cart.getItemById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving a cart item with id ${id}`,
      });
    });
};

// Update an Cart item by the id.
exports.updateItem = (req, res) => {
  const id = req.params.id;

  Cart.updateItem(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Cart item was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update cart item with id=${id}. Maybe item was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating cart item with id=${id}`,
      });
    });
};

// Delete an Cart item with the specified id.
exports.delete = (req, res) => {
  const id = req.params.id;

  Cart.delete({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Cart item was deleted successfully" });
      } else {
        res.send({
          message: `Cannot update Cart item with id=${id}. Maybe Cart item was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting Cart item with id=${id}`,
      });
    });
};

// Delete all Cart items.
exports.deleteAll = (req, res) => {
  Cart.delete({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Cart items were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cart items.",
      });
    });
};
